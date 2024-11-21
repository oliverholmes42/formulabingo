// Read.js
export async function Read() {
    try {
        const response = await fetch("https://bingo.redata.app/api/bricks"); // Update with your API endpoint
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function Update(updatedData){

    const response = await fetch(`https://bingo.redata.app/api/bricks/${updatedData.brick_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    return response.json();
}

export async function Latest(){
    const response = await fetch('https://bingo.redata.app/api/latest-events',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    });

    return response.json();
}


export async function Create(brickData) {
    const response = await fetch('https://bingo.redata.app/api/bricks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(brickData),
    });
    const data = await response.json();
    if (data.status === 'success') {
        return data.brick_id;
    } else {
        throw new Error(data.message || 'Failed to create brick');
    }
}

