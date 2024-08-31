import ReactDOM from 'react-dom/client'; // Изменено
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

// Найти корневой элемент
const rootElement = document.getElementById('root') as HTMLElement;

// Создать корневой рендер
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
