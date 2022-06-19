// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

 

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/material';

export default function ShowNotes(props) {
  return (
    <div>
    <Container style={{marginTop: '10px'}}>
      <Accordion  style={{background:"#CDF0EA"}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='h5'>{props.details.content.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6'>
          {props.details.content.desc}
          </Typography>
          {console.log(props.img_URL)}
          <div className='text-center'>
          <img src={props.img_URL} style={{borderRadius: "5px",maxWidth:"700px"}}/>
          </div>
        </AccordionDetails>
      </Accordion>
       
      </Container>
    </div>
  );
}





// export default function ShowNotes(props) {
//     console.log("HI");
//   return (
//     <Card sx={{ maxWidth: "345rem" }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image="/static/images/cards/contemplative-reptile.jpg"
//         alt="green iguana"
      
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {props.details.content.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//             {props.details.content.desc}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Share</Button>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }