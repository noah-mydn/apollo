import './App.css';
import { Home } from './screen/Home';
import {useMediaQuery, Alert, AlertTitle} from '@mui/material';

function App() {

  const SCREENSIZE = useMediaQuery('(min-width:900px)');
  
  // if(!SCREENSIZE) {
  //   console.log("SMALL SCREEN!")
  // }

  return (
    <>
    {SCREENSIZE ? 
      <Home/> :
      <div className='alert'>
        <Alert severity="error" variant='filled'>
          <AlertTitle><strong>Screen Width Conflict</strong></AlertTitle>
           We are sorry to see that your screen size is not compatible to run the website.
           Apollo is currently designed only for screen that are greater than 900px.
        </Alert>
      </div>
    }
     </> 
  );
}

export default App;
