export async function Read(id){
    try {
        const response = await fetch('https://www.bingo.redata.app/api/users/' + id);
        const data = await response.json();
        return data;
    }
    catch (error) {

    }

}

export async function Update(id, data) {
    const response = await fetch(`https://bingo.redata.app/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user');
    }

    return response.json();
}

