import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createStore, applyMiddleware } from 'redux';
import reducer from './redux/reducer'
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Home from './components/Home/Home'
import LandingPage from './components/Landing/Landing'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import Recipe from './components/recipe/recipe'
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


configure({ adapter: new Adapter() });
const store = createStore(reducer, applyMiddleware(thunk))
const recipe = {
  name: "Test Recipe",
  health_score: 92,
  resume: 'this is the resume',
  id: 1
}
const favrecipes = [
  {
    name: "Test Recipe",
    health_score: 92,
    resume: 'this is the resume',
    id: 1
  },
  {
    name: "Test Recipe2",
    health_score: 1,
    resume: 'this is another resume',
    id: 2
  }
]

describe('Paths', () => {

  it('Un path aleatorio no deberia mostrar ningun componente', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(LandingPage)).toHaveLength(0);
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(RecipeDetails)).toHaveLength(0)
    expect(wrapper.find(CreateRecipe)).toHaveLength(0)
  })


  it('La ruta /home deberia renderizar el home', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/home' ]}>
          <App/>
        </MemoryRouter>

      </Provider>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
  })

  it('La ruta / deberia renderizar la landing page', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/' ]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(LandingPage)).toHaveLength(1);
  })

  it('La ruta /CreateRecipe deberia renderizar el form', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/CreateRecipe' ]}>
          <App/>
        </MemoryRouter>

      </Provider>
    );
    expect(wrapper.find(CreateRecipe)).toHaveLength(1);
  })

});

describe("<Recipe/>", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Recipe recipe={recipe} favrecipes={favrecipes}/>
        </MemoryRouter>
      </Provider>
    );
  });

  it("Muestra el nombre", () => {
    screen.getByText("Test Recipe");
  });
  it("Muestra el resumen", () => {
    screen.getByText('this is the resume');
  })
  it("Debe renderizar un <img>", () => {
    screen.getByAltText("imagen-not-found");

  });
  it('Muestra el puntaje correctamente', () => {
    screen.queryByText('92')
  })
});


describe("<LandingPage/>", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LandingPage/>
      </MemoryRouter>
    );
  });

  it("Tiene un boton con el texto correspondiente", () => {
    screen.getByText("Let's Cook !!");
  });
});