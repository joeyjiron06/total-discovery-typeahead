const restify = require('restify');
const db = require('./db');
const levenshteinDistance = require('./levenshtein');
const server = restify.createServer();

server.use(restify.plugins.queryParser({ mapParams: true }));
server.use((req, res, next) => {
  console.log('req.url', req.origin);
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  next();
});
/**
 * Didn't have enough time to make this a more complete implementation. Here I
 * am just iterating over all words in the database and return the closest 10
 * words. Ideally it'd be nice to find clustered words or some other hueristic
 * to show the user multiple word predictions.
 */
server.get('/autocomplete', (req, res, next) => {
  const query = req.params.query;

  // super slow
  const lDistanceForWords = db.words().map(word => ({
    word,
    distance: levenshteinDistance(query, word)
  }));

  // super slow again
  lDistanceForWords.sort(
    (wordDistancePairA, wordDistancePairB) =>
      wordDistancePairA.distance - wordDistancePairB.distance
  );

  const result = lDistanceForWords.slice(0, 10).map(pair => pair.word);
  res.send(result);

  next();
});

server.get('/search', (req, res, next) => {
  const results = db.search(req.params.query);
  res.send(results);
  next();
});

server.listen(8080, function() {
  console.log('ready on %s', server.url);
});
