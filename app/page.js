'use client'

import { useState, useEffect } from "react";
import { Typography, Button, TextField, Stack, Box } from "@mui/material";
import Deck from '../components/deck';

export default function Home() {
  const [message, setMessage] = useState('');
  const [flashCards, setFlashCards] = useState([]);

  const sendRequest = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({prompt: message})
      });

      if (!response.ok){
        throw new Error("Failed to fetch response from the API");
      }

      const data = await response.json();
    
      console.log(data);
      setFlashCards(data);
      console.log(flashCards);

    } catch(e) {
      console.error("Error fetching flashcards: ", e);
    }
  }



  return (
    <>
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f0f0f0"
      p={2}
    >
      <Typography>Enter a prompt to generate flash cards</Typography>
      <Stack spacing={2}>
        <TextField
          label="Type a message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={sendRequest} // Call sendRequest when button is clicked
        >
          Send
        </Button>
      </Stack>

      {flashCards.length > 0 ? (
        <Box mt={4} width="100%" display="flex" justifyContent="center">
          {/* Pass flashCards data to the Deck component */}
          <Deck cardsData={flashCards} />
        </Box>
      ) : (
        <Typography mt={4}>No flashcards yet. Please enter a prompt.</Typography>
      )}
    </Box>
    </>
  );
}
