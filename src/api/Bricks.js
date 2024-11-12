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
    console.log(updatedData);
    const response = await fetch(`https://bingo.redata.app/api/bricks/${updatedData.brick_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    return response.json();
}
