# -*- mode: ruby -*-
# vi: set ft=ruby :

# Ejecute `vagrant up` para iniciar el proyecto actual
# con Docker y docker-compose

Vagrant.configure("2") do |config|
    # Establecer el nombre de la caja 
    config.vm.define "box-cotojs"
    #config.vm.hostname = "abc"
  
    # Usar la caja de Ubuntu 20.04 LTS 64-bit
    # ver más box https://app.vagrantup.com/boxes/search
    config.vm.box = "ubuntu/focal64"
    config.vm.box_check_update = false
    
    # Montar el dicrectorio actual a la ruta absoluta
    config.vm.synced_folder "./", "/home/vagrant/workspace"
    
    # La persistencia de datos no funciona si está sincronizado
    # use disabled: true
    config.vm.synced_folder "./data", "/home/vagrant/data", 
    owner: "root", group: "root", create: true, disabled: true
  
    # Crear una red privada, para acceder usando una IP especifica
    config.vm.network "private_network", ip: "192.168.63.80"
  
    # Actualizar repositorio la caja de Ubuntu 20.04LTS
    config.vm.provision "shell", inline: "sudo apt-get update -qq -y"
    
    # Instalar docker y descagar imagen de docker (node:16.20-slim)
    # *OJO* : Corre solo una vez usando `vagrant up`
    config.vm.provision "install-docker",
        type: "docker",
        images: ["node:18.20-slim", "mysql:5.7", "mongo:6.0"]
    
    #config.vm.provider "vmware_fusion" do |v|
    #    v.vmx["vhv.enable"] = "TRUE"
    #end
  
    # Instalar docker-compose 
    # ver: https://github.com/docker/compose/releases
    # *OJO* : Corre solo una vez usando `vagrant up`
    config.vm.provision "install-docker-compose",
        type: "shell",
        inline: <<-SCRIPT 
        sudo rm -rf /usr/local/bin/docker-compose
        sudo rm -rf /usr/bin/docker-compose
        sudo curl -SL https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
        docker-compose --version
        echo 'alias doc=docker-compose' >> ~/.bashrc
        echo 'alias doc-again="docker-compose stop && docker-compose rm --force && docker-compose build --no-cache && docker-compose up"' >> ~/.bashrc
        source ~/.bashrc
        SCRIPT

    # Instalar herramientas de desarrollo
    # *OJO* : Corre solo una vez usando `vagrant up`
    config.vm.provision "install-tools", 
        type: "shell", 
        inline: <<-SHELL
            apt-get update
            apt-get install -y vim nano curl wget tmux net-tools screenfetch zip unzip htop aptitude 
            apt-get install -y dos2unix tar build-essential software-properties-common ufw fail2ban
            apt-get install -y gdb httpie jq netcat nmap tree openssh-client software-properties-common gnupg2
        SHELL
    
    # Ejecutar el proyecto actual con Docker y docker-compose
    # *OJO* : Siempre corre usando `vagrant up`
    config.vm.provision "run-workspace",
        type: "shell",
        path: "./vagrant.sh",
        run: "always"  

    # Mostrar información de la caja
    # *OJO* : Corre solo una vez usando `vagrant up`
    config.vm.provision "show-information",
        type: "shell", 
        inline: <<-SHELL
            screenfetch
            netstat -rn
            ss -tuln
            lsblk
            ip route
            ipconfig
            echo "==================================="
            echo "==================================="
            echo "Nombre de usuario:"
            whoami
            echo "Distribución de Linux y versión:"
            lsb_release -a
            echo "Versión del kernel:"
            uname -r
            echo "Memoria RAM:"
            free -h
            echo "Número de CPUs y detalles del procesador:"
            lscpu
            echo "Información de almacenamiento:"
            df -h
            echo "Puertos habilitados y servicios en escucha:"
            netstat -tuln
            echo "Interfaces de red y configuración:"
            ip a
            echo "Servicios habilitados y en ejecución:"
            systemctl list-units --type=service --state=running
        SHELL
end
