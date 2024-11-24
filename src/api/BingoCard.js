const API_BASE_URL = 'https://bingo.redata.app/api';

/**
 * Create a new bingo card for a specific user.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object>} The response data or error message.
 */
export async function Create(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/bingo-cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create bingo card');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating bingo card:', error.message);
        throw error;
    }
}

/**
 * Read a bingo card by its ID or all bingo cards for a user if `userId` is provided.
 * @param {number} [cardId] - The ID of the bingo card.
 * @param {number} [userId] - The ID of the user.
 * @returns {Promise<Object|Array>} The response data or error message.
 */
export async function Read(cardId = null, userId = null) {
    try {
        let url = `${API_BASE_URL}/bingo-cards`;
        if (cardId) {
            url += `/${cardId}`;
        } else if (userId) {
            url += `?user_id=${userId}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch bingo card(s)');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching bingo card(s):', error.message);
        throw error;
    }
}

export async function LeaderBoard(user_id) {
    try {
        // Send GET request to the leaderboard endpoint with the user_id as a query parameter
        const response = await fetch(`https://bingo.redata.app/api/leaderboard?user_id=${user_id}`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Return the leaderboard data
        return data;
    } catch (error) {
        // Log and rethrow any errors for further handling
        console.error("Error fetching leaderboard:", error);
        throw error;
    }
}


export async function UpdateBrickCard(user_id, card_id, brick) {
    try {
        // API endpoint for updating a specific brick on a specific card
        const endpoint = `https://bingo.redata.app/api/bingo-cards/${card_id}/bricks/${brick.brick_id}`;

        // Prepare the request payload
        const payload = {
            user_id, // The user performing the action
            boost_level: 2
        };

        // Send the PUT request to the API
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to update brick card: ${response.statusText}`);
        }

        // Parse and return the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        // Log and rethrow any errors for further handling
        console.error('Error updating brick card:', error);
        throw error;
    }
}

