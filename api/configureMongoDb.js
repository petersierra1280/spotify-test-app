module.exports = ({
  host,
  database,
  user,
  password,
  replicaSet,
  authDatabase,
  mongoose
}) => {
  mongoose.Promise = global.Promise;

  let url = `${host}/${database}`;
  if (replicaSet) {
    url += `?replicaSet=${replicaSet}`;
  }
  if (authDatabase) {
    url += `${replicaSet ? '&' : '?'}authSource=${authDatabase}`;
  }

  if (user && password) {
    url = `${user}:${password}@${url}`;
  }

  url = `mongodb://${url}`;
  console.log(`Connecting to ${database}`);

  mongoose.connect(url, {
    useNewUrlParser: true,
    reconnectTries: 30000,
    reconnectInterval: 1000,
    ssl: replicaSet ? true : false
  });

  const connection = mongoose.connection;
  connection.on('connecting', () => console.log('Connecting to mongodb'));
  connection.on('connected', () => console.log(`Connected to ${database}`));
  connection.on('disconnecting', () =>
    console.warn(`Disconnecting from ${database}`)
  );
  connection.on('disconnected', () =>
    console.warn(`Disconnected from ${database}`)
  );
  connection.on('close', () => console.warn('Mongodb connection closed'));
  connection.on('error', err =>
    console.error(`Mongodb connection error (${database}): ${err.message}`)
  );
  connection.on('reconnected', () =>
    console.log('Mongodb connection reconnected')
  );

  return connection;
};
