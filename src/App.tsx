import './App.scss';

function App() {
  return (
    <div className='app'>
      <header>
        <div className='app-header'>
          <h1 className='title'>List of keywords</h1>
          <button type='button'>
            <div>Search volume</div>
            <i>v</i>
          </button>
        </div>
      </header>
      <main>
        <div className='app-main'>
          <table>
            <thead>
              <tr>
                <th>
                  Keywords <i>{'<>'}</i>
                </th>
                <th>
                  Search volume <i>{'<>'}</i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ambient study music to concentrate</td>
                <td>33,723</td>
              </tr>
              <tr>
                <td>study music to concentrate</td>
                <td>9,887</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <footer>
        {
          // TODO: Pagination can be here?
        }
      </footer>
    </div>
  );
}

export default App;
