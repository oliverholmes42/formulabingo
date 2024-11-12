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
