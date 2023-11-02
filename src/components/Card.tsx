import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import '../styles/styles.scss'; 


interface MediaCardProps {
  img: string; 
  title: string;
  types: string[];

}

export default function MediaCard({img, title, types}:MediaCardProps) {
    return (
      <Card sx={{ maxWidth: 345, margin: 2, padding:2}}>
        <div>
          <CardMedia
          sx={{ height: 200, width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          image={img}
          title={title}
          />
        </div>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"  sx={{fontWeight:'500'}}>
              {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {types.join(', ')}
          </Typography>
        </CardContent>
        <CardActions sx={{display:'flex'}} className="center-card">
          <Link to={`/pokemon/${title}`}>
            <button>Learn More</button>
          </Link>
        </CardActions>
      </Card>
    );
}