const tf = require('@tensorflow/tfjs');
const axios = require('axios');

const SYMBOL = 'GOOGL';
const START_DATE = '2010-01-01';
const END_DATE = '2022-02-21';

const loadStockData = async () => {
  const url = `https://query1.finance.yahoo.com/v7/finance/download/${SYMBOL}?period1=${new Date(START_DATE).getTime() / 1000}&period2=${new Date(END_DATE).getTime() / 1000}&interval=1d&events=history&includeAdjustedClose=true`;
  const res = await axios.get(url);
  const csv = res.data;
  const lines = csv.trim().split('\n').slice(1);
  const data = lines.map(line => {
    const [date, open, high, low, close, adjClose, volume] = line.split(',');
    return {
      date: new Date(date),
      open: parseFloat(open),
      high: parseFloat(high),
      low: parseFloat(low),
      close: parseFloat(close),
      adjClose: parseFloat(adjClose),
      volume: parseInt(volume)
    };
  });
  return data;
};

const trainModel = async (data) => {
  const tensorData = data.map(d => [d.close]);
  const xs = tf.tensor2d(tensorData.slice(0, -1), [tensorData.length - 1, 1]);
  const ys = tf.tensor2d(tensorData.slice(1), [tensorData.length - 1, 1]);
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  await model.fit(xs, ys, { epochs: 50 });
  return model;
};

const predict = async (model, data) => {
  const lastClose = data[data.length - 1].close;
  const nextClose = (await model.predict(tf.tensor2d([[lastClose]])).data())[0];
  return nextClose;
};

(async () => {
  const data = await loadStockData();
  const model = await trainModel(data);
  const nextClose = await predict(model, data);
  console.log(`Next day's predicted closing price for ${SYMBOL}: $${nextClose}`);
})();
