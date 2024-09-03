import {Box, Card , CardContent, Typography , Button } from "@mui/material";

export default function EventDescription() {
  return (
    <Box>
      <Card sx={{md: 4}}>
        <CardContent>
          <Typography variant="h6">Thicket Pice: $50 - $200</Typography>
        </CardContent>
        <CardContent>
            <Button variant="contained" color="primary">
                Get Ticket
            </Button>
        </CardContent>
      </Card>

      <Typography variant="body1">
        this is the description of the event .
      </Typography>
    </Box>
  );
}
