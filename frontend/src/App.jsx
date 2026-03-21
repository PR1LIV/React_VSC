import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Counter from './Counter';

function App() {
  return (
    <div>
      <Header
        title="Мой React проект"
        subtitle="Мой первый React проект"
      />
      <Counter />

      <Footer
        text="Мой сайт."
      />
    </div>
  );
}

export default App;