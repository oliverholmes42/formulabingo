export async function login(email, password) {
    try {
        const response = await fetch('https://bingo.redata.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // JSON body with email and password
        });

        // Check if the request was successful
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

        // Parse the JSON response
        const data = await response.json();

        // Assuming the response contains an ID
        return [data.id, data.admin]; // Return user ID
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
}

// api/auth.js

export async function signup(email, password, username) {
    const response = await fetch('https://bingo.redata.app/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            username
        }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
    }

    return data; // Should return { status: 'success', message: 'User registered successfully', user_id: ... }
}

export async function changePassword(id, old, newPassword){
    const response = await fetch('https://bingo.redata.app/api/changePassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            old,
            "new": newPassword
        }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
    }

    return data; // Should return { status: 'success', message: 'User registered successfully', user_id: ... }

}

