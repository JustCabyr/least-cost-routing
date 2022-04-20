import app, { port } from './app';

app
  .listen(app.get('port'), () => {
    console.log('App listening on port ' + port);
  })
