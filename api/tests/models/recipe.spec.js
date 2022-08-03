const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    
    
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({
        resume: 'this is the resume',
        health_score: 20})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Recipe.create({ 
          name: 'Milanesa a la napolitana',
          resume: 'this is the resume',
          health_score: 20
        });
      });

      it('should throw an error if resume is null', (done) => {
        Recipe.create({
          name: 'Milanesa a la napolitana',
          health_score: 20
      })
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({
            name: "Test recipe",
            resume: "this is the resume",
            healthScore: 40
        });
      });

      it('should throw an error if a score is not in range (0-100)', (done) => {
        Recipe.create({
          name: "Test recipe",
          summary: "Soy el summary",
          healthScore: 1000
      })
          .then(() => done(new Error('It requires a score between 0-100')))
          .catch(() => done());
      });
      it('should work when score is in range (0-100)', () => {
        Recipe.create({
            name: "Test recipe",
            summary: "Soy el summary",
            healthScore: 40
        });
      });







    });
  });
});
