import React from "react";

function EventDialogBox( {props}) {
    const Event = () => {
        const [open, setOpen] = useState(false);
        const [selectedEvent, setSelectedEvent] = useState(null);
    }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent display="flex">
          <Box sx={{ display: "flex", textaling: "center" }}>
            <div>
              <Typography variant="h6">
                Start Date: {selectedEvent?.start_date}
              </Typography>
              <Typography variant="h6">
                EndDate: {selectedEvent?.end_date}
              </Typography>
            </div>
            <div>
              <Typography variant="h6">
                Start Time: {selectedEvent?.start_time}
              </Typography>
              <Typography variant="h6">
                End Time: {selectedEvent?.end_time}
              </Typography>
            </div>
          </Box>
          <Typography variant="h6">
            Capacity: {selectedEvent?.capacity}
          </Typography>
          <Typography variant="h6">Location: {selectedEvent?.venue}</Typography>
          <Typography variant="body1">{selectedEvent?.description}</Typography>
        </DialogContent>
        <Button
          oneClick={() => {
            if (!selectedEvent) {
              Navigate(`/event/${selectedEvent._id}`);
              console.log("show data!");
            }
          }}
          variant="contained"
          color="primary"
          sx={{
            padding: 2,
            marginInline: 3,
            marginTop: "auto",
          }}
        >
          buy now
        </Button>
      </Dialog>
    </div>
  );
}

export default EventDialogBox;
