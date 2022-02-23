import SentimentVerySatisfiedSharpIcon from '@mui/icons-material/SentimentVerySatisfiedSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import InsertEmoticonSharpIcon from '@mui/icons-material/InsertEmoticonSharp';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Home() {

  const nav = useNavigate('');

  return <div className='body-div'>
      <img src="https://media.istockphoto.com/photos/classic-pizza-with-a-lot-of-cheese-homemade-pizza-picture-id1221683562?k=20&m=1221683562&s=612x612&w=0&h=fN-1yJVTcy7ELu7pTbR1mIcs1N7mySGNmER2tAOPF4Q="/>
    <div className='food-quote'>
      <p>Find y<FavoriteBorderSharpIcon fontSize='large' />ur happiness here...<InsertEmoticonSharpIcon fontSize='large' />
        <SentimentVerySatisfiedSharpIcon fontSize='large' /></p>
      <Button variant="contained"
        endIcon={<SendIcon style={{ color: "black" }} />}
        style={{ fontFamily: "Cursive", backgroundColor: "orange", color: "black" ,float:"right"}}
        onClick={() => nav('/menu')}> View Menu</Button></div>
  </div>;
}

export default Home;
