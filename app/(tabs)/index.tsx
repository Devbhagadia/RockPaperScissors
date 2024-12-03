import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const App = () => {
    // State variables
    const [player1Choice, setPlayer1Choice] = useState(null);
    const [player2Choice, setPlayer2Choice] = useState(null);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);  // Track whose turn it is
    const [gameState, setGameState] = useState("Player 1's Turn");  // Track game state

    // Game logic function to decide the winner
    const logic = (choice1, choice2) => {
        if (choice1 === choice2) return 0; // tie
        if (
            (choice1 === "ROCK" && choice2 === "SCISSORS") ||
            (choice1 === "SCISSORS" && choice2 === "PAPER") ||
            (choice1 === "PAPER" && choice2 === "ROCK")
        ) {
            return 1; // Player 1 wins
        }
        return -1; // Player 2 wins
    };

    // Handle decisions based on the current player turn
    const decision = (choice) => {
        if (isPlayer1Turn) {
            setPlayer1Choice(choice);
            setIsPlayer1Turn(false);
            setGameState("Player 2's Turn");
        } else {
            setPlayer2Choice(choice);
            setIsPlayer1Turn(true);
            setGameState("Determining Result...");

            // Delay result calculation to ensure both choices are made
            setTimeout(() => {
                const result = logic(player1Choice, choice);
                if (result === 1) {
                    setPlayer1Score(player1Score + 1);
                    setGameState("Player 1 Wins this Round!");
                } else if (result === -1) {
                    setPlayer2Score(player2Score + 1);
                    setGameState("Player 2 Wins this Round!");
                } else {
                    setGameState("It's a Tie!");
                }
            }, 500); // Delay to simulate decision time
        }
    };

    // Reset the game for a new round
    const resetGame = () => {
        setPlayer1Choice(null);
        setPlayer2Choice(null);
        setGameState("Player 1's Turn");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rock, Paper, Scissors (Multiplayer)</Text>
            <Text style={styles.turnText}>{gameState}</Text>

            {/* Buttons to select the choice for the current player */}
            {isPlayer1Turn ? (
                <Text style={styles.turnText}>Player 1, Choose Your Move:</Text>
            ) : (
                <Text style={styles.turnText}>Player 2, Choose Your Move:</Text>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => decision("ROCK")}>
                    <Text style={styles.buttonText}>Rock</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => decision("PAPER")}>
                    <Text style={styles.buttonText}>Paper</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => decision("SCISSORS")}>
                    <Text style={styles.buttonText}>Scissors</Text>
                </TouchableOpacity>
            </View>

            {/* Display the choices and scores after both players have chosen */}
            {player1Choice && player2Choice && (
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>Player 1's choice: {player1Choice}</Text>
                    <Text style={styles.scoreText}>Player 2's choice: {player2Choice}</Text>
                    <Text style={styles.scoreText}>Player 1 Score: {player1Score}</Text>
                    <Text style={styles.scoreText}>Player 2 Score: {player2Score}</Text>
                </View>
            )}

            {/* Button to reset the game */}
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                <Text style={styles.buttonText}>Reset Game</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
        color: "#fff",
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: "#4caf50",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    button: {
        backgroundColor: "#4caf50",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    scoreContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    scoreText: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center",
    },
    resetButton: {
        backgroundColor: "#f44336",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    turnText: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 10,
    },
});

export default App;