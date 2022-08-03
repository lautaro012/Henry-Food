/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Test recipe',
  resume: 'this is the resume',
  health_score: 20,
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  
  describe('GET /api/Recipe', () => {
    it('should get 200', () =>
      agent.get('/api/Recipe').expect(200)
    );
  });

  describe('GET /api/Recipe?name=Test', () => {
    it('should get the recipes that includes the query with code 200', () =>
      agent.get('/api/Recipe?name=Test')
      .expect(200)
      .expect(res => {
        expect(res.body[0]?.name).equal('Test recipe')
      })
    );
  
    it('should send a message if no recipes are found with the query', () =>
      agent.get('/api/Recipe?name=TestNotFound')
      .expect(404)
      .expect(res => {
        expect(res.text).equal('No se encontro receta con ese nombre.')
      })
    );
  });



  describe('GET /api/Recipe/id', () => {

    it('should get the recipe by id with code 200', () =>
      agent.get('/api/Recipe')
      .expect(200)
      .expect(res => {
        agent.get('/api/Recipe/' + res.body[10].id)
        .expect(res => {
          expect(res.body[0]?.name).equal('Test recipe')
        })
      })
    );
  });
    
    // it('should send code 404 if not found', () =>
    // agent.get('/api/Recipe/asd')
    // .expect(404)
    // )
    

});
