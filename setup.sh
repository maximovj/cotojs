#!/bin/bash
echo "[setup.sh] Provision iniciando [...]"
# Instalar Node Manager Version
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
source /home/vagrant/.bashrc
nvm install node

# Crear alias para usarlo dentro vagrant
echo " "
echo ">>>>>>>>>>> [ Creando Alias ] >>>>"
echo ' ' >> /home/vagrant/.bashrc
echo '# Creando alias para docker-compose y docker' >> /home/vagrant/.bashrc
echo 'alias doc=docker-compose' >> /home/vagrant/.bashrc
echo 'alias doc-rm="docker-compose stop && docker-compose rm --force"' >> /home/vagrant/.bashrc
echo 'alias doc-again="docker-compose stop && docker-compose rm --force && docker-compose build && docker-compose up"' >> /home/vagrant/.bashrc
echo 'alias docker-ps-clean="docker container prune -f"' >> /home/vagrant/.bashrc
echo 'alias docker-images-clean="docker rmi $(docker images -f "dangling=true" -q)"' >> /home/vagrant/.bashrc
echo ' ' >> /home/vagrant/.bashrc
source /home/vagrant/.bashrc
echo " "
echo ">>>>>>>>>>> [ Finalizado ] >>>>"
echo "[setup.sh] Provision finalizado exitosamente ! [...]"