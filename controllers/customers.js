//const redis = require('redis');
//const client = redis.createClient(7000);

const Redis = require('ioredis');
const cluster = new Redis([
    {
        port: 7000,
        host: "127.0.0.1"
    },
    {
        port: 7001,
        host: "127.0.0.1"
    },
    {
        port: 7002,
        host: "127.0.0.1"
    },
    {
        port: 7003,
        host: "127.0.0.1"
    },
    {
        port: 7004,
        host: "127.0.0.1"
    },
    {
        port: 7005,
        host: "127.0.0.1"
    }
],
{
    redisOptions : {
        max_clients: 30,
        perform_checks: true,
    }
}
);

cluster.on('error', (err) => console.log(err.message));

console.log(cluster);


const getCustomer = async (req, res) => {
    try {
        const { username } = req.params;
        if(!username) {
            return res.status(400).json({ status: 'error', description: 'invalid parameters'});
        }
        cluster.get(username, (err, data) => {
            if (err) throw err;
            if(data) {
                return res.status(200).json({ status: 'success', amount: data });
            }
        });
        
    } catch(err) {
        return res.status(500).json({ status: 'error', description: err.message });
    }
};


const addCustomer = async (req, res) => {
    try{
        
        const { username, amount } = req.body;
        if(username && amount) {
            const reply = cluster.set(username, amount);
            return res.status(200).json({ status: 'success', description: reply });
        } else {
            return res.status(400).json({ status: 'error', description: 'invalid parameters'});
        }
        
    } catch(err) {
        return res.status(500).json({ status: 'error', description: err.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { username } = req.params;
        const { amount } = req.body;
        if(username && amount) {
            const reply = cluster.set(username, amount);
            res.status(200).json({ status: 'success', description: reply });
        } else {
            return res.status(400).json({ status: 'error', description: 'invalid parameters'});
        }
        
    } catch(err) {
        return res.status(500).json({ status: 'error', description: err.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { username } = req.body;
        if( username ) {
            cluster.del(username);
            res.status(200).json({ status: 'success', description: 'deleted' });
        } else {
            return res.status(400).json({ status: 'error', description: 'invalid parameters'});
        }
        
    } catch(err) {
        return res.status(500).json({ status: 'error', description: err.message });
    }
};

module.exports = { getCustomer, addCustomer, updateCustomer, deleteCustomer };