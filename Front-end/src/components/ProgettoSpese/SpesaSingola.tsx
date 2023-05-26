import React from 'react';

const ShoppingListPage: React.FC = () => {
  return (
    <div>
      <body>
        <ol>
          <li>
            TO BUY: <input />
          </li>
          <li>
            <input />
          </li>
          <li>
            <input />
          </li>
          <li>
            <input />
          </li>
          <li>
            <input />
          </li>
          <li>
            <input />
          </li>
          <li>
            <input />
          </li>
          <li>
            <input />
          </li>
          <li>
            <input />
          </li>
          <li>
            <input />
          </li>
        </ol>

        <input type="number" placeholder="importo speso" />

        <br />
        <br />

        <a href="SpesaSingola.html">
          <button>Nuova lista</button>{' '}
        </a>
        <a href="index.html">
          <button>Fine spesa</button>{' '}
        </a>
      </body>
    </div>
  );
};

export default ShoppingListPage;
