# Steps to create redis cluster with docker

## 1 - Pull the docker image
``` sudo docker pull redis ```



## 2 - create configs for each redis node
### for a cluster there should be at least 3 master nodes, if create replica for each master, we should create 6 nodes
### Therefore we create 6 folders and each contains redis.conf file
### creating 6 folders with port number as name
``` mkdir 7000 7001 7002 7003 7004 7005 ```

### for each redis.conf file we should add - (rememeber port is different)
 ``` 
port 7000
cluster-enabled yes 
cluster-config-file nodes.conf 
cluster-node-timeout 5000 
bind 127.0.0.1 
```



## 3 - after creating redis.conf files we should create images 

``` 
sudo docker run -v <absolute file path>/7000/redis.conf:/usr/local/etc/redis/redis.conf -d --net=host --name myredis-0 redis redis-server /usr/local/etc/redis/redis.conf

sudo docker run -v <absolute file path>/7001/redis.conf:/usr/local/etc/redis/redis.conf -d --net=host --name myredis-1 redis redis-server /usr/local/etc/redis/redis.conf

sudo docker run -v <absolute file path>/7002/redis.conf:/usr/local/etc/redis/redis.conf -d --net=host --name myredis-2 redis redis-server /usr/local/etc/redis/redis.conf

sudo docker run -v <absolute file path>/7003/redis.conf:/usr/local/etc/redis/redis.conf -d --net=host --name myredis-3 redis redis-server /usr/local/etc/redis/redis.conf

sudo docker run -v <absolute file path>/7004/redis.conf:/usr/local/etc/redis/redis.conf -d --net=host --name myredis-4 redis redis-server /usr/local/etc/redis/redis.conf

sudo docker run -v <absolute file path>/7005/redis.conf:/usr/local/etc/redis/redis.conf -d --net=host --name myredis-5 redis redis-server /usr/local/etc/redis/redis.conf

```

### we can confimed if images are up and running by 
``` sudo docker ps ```

### this command should display 6 images




## 4 - Then we will get inside to a running redis instance to create cluster
``` sudo docker exec -it <container-id> sh ```

### this will open redis bash




## 5 - Then create the cluster
``` redis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005  --cluster-replicas 1 ```

### here replicas set to 1 and each master node will have one replica