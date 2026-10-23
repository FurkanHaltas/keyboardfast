#!/usr/bin/env bash
# One-time hardening + Docker setup for a fresh Ubuntu 24.04 VPS. Run as root:
#   ADMIN_KEY="ssh-ed25519 ..." DEPLOY_KEY="ssh-ed25519 ..." bash setup-server.sh
# Creates:
#   furkan  - admin user (sudo, key-only login)
#   deploy  - CI user that can only run Docker, owns /opt/keyboardfast
set -euo pipefail

: "${ADMIN_KEY:?ADMIN_KEY is required}"
: "${DEPLOY_KEY:?DEPLOY_KEY is required}"
ADMIN_USER=furkan
DEPLOY_USER=deploy
APP_DIR=/opt/keyboardfast

export DEBIAN_FRONTEND=noninteractive

echo "==> System update"
apt-get update -q
apt-get upgrade -yq
apt-get install -yq ca-certificates curl gnupg ufw fail2ban unattended-upgrades

echo "==> Docker (official repository)"
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
. /etc/os-release
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" \
  > /etc/apt/sources.list.d/docker.list
apt-get update -q
apt-get install -yq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Keep container logs from filling the disk.
cat > /etc/docker/daemon.json <<'JSON'
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
JSON
systemctl enable --now docker
systemctl restart docker

echo "==> Users"
add_user() {
  local user=$1 key=$2
  id "$user" &>/dev/null || adduser --disabled-password --gecos "" "$user"
  install -d -m 700 -o "$user" -g "$user" "/home/$user/.ssh"
  echo "$key" > "/home/$user/.ssh/authorized_keys"
  chown "$user:$user" "/home/$user/.ssh/authorized_keys"
  chmod 600 "/home/$user/.ssh/authorized_keys"
}
add_user "$ADMIN_USER" "$ADMIN_KEY"
add_user "$DEPLOY_USER" "$DEPLOY_KEY"
usermod -aG sudo,docker "$ADMIN_USER"
usermod -aG docker "$DEPLOY_USER"
echo "$ADMIN_USER ALL=(ALL) NOPASSWD:ALL" > "/etc/sudoers.d/90-$ADMIN_USER"
chmod 440 "/etc/sudoers.d/90-$ADMIN_USER"

install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$APP_DIR"

echo "==> Firewall"
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp
ufw --force enable

echo "==> Automatic security updates + fail2ban"
dpkg-reconfigure -f noninteractive unattended-upgrades
systemctl enable --now fail2ban

# Run with HARDEN_SSH=1 only after confirming key login as $ADMIN_USER works,
# otherwise a mistake could lock everyone out.
if [[ "${HARDEN_SSH:-0}" == 1 ]]; then
  echo "==> SSH: keys only, no root login"
  cat > /etc/ssh/sshd_config.d/90-hardening.conf <<'CONF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
CONF
  sshd -t
  systemctl reload ssh
fi

echo "==> Done. Log in as: ssh $ADMIN_USER@<server-ip>"
