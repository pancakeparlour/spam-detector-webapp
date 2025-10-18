import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box } from "@mui/material";
import axios from "axios";

function Home() {
        const [input, setInput] = useState("");
        const [result, setResult] = useState("");

        const handlePredict = async () => {
                try {
                        const res = await axios.get(`http://127.0.0.1:8000/predict/${input}`);
                        setResult(res.data.prediction);
                } catch (err) {
                        console.error(err);
                }
        };

        return (
                <Container>
                <Typography variant="h4" gutterBottom>Spam Classifier</Typography>
                <TextField
                label="Enter a value"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={handlePredict} variant="contained" sx={{ ml: 2 }}>
                Predict
                </Button>
                {result && <Typography sx={{ mt: 2 }}>Prediction: {result}</Typography>}
                </Container>
        );
}

function About() {
        return (
                <Container>
                <Typography variant="h4">About</Typography>
                <Typography>This project classifies emails as spam or not spam using ML.</Typography>
                </Container>
        );
}

function App() {
        return (
                <Box>
                <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>Spam Classifier App</Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/about">About</Button>
                </Toolbar>
                </AppBar>

                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                </Routes>
                </Box>
        );
}

export default App;

