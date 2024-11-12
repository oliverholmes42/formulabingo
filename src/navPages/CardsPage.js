import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Create, Read } from "../api/BingoCard";
import BingoCard from "../components/BingoCard/BingoCard";
import Modal from "../components/Modal/Modal";
import LoginRedirect from "../components/LoginRedirect/LoginRedirect";
import CardList from "../components/CardList/CardList";

export default function BingoCardPage() {
    const { id } = useAuth(); // Get the user ID from AuthContext
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to create a new bingo card and fetch its data
    const create = async () => {
        setLoading(true);
        try {
            const newCard = await Create(id); // Use `id` from AuthContext as `userId`
            console.log('New Bingo Card Created:', newCard);

            // Fetch and display the created card
            fetchCard(newCard.card_id);
        } catch (error) {
            console.error('Failed to create bingo card:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch a specific bingo card's data
    const fetchCard = async (card_id) => {
        setLoading(true);
        try {
            const card = await Read(card_id);
            setSelectedCard(card);
        } catch (error) {
            console.error('Failed to fetch bingo card:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all bingo cards for the user on component mount
    useEffect(() => {
        const fetchBingoCards = async () => {
            if (id) {
                setLoading(true);
                try {
                    const userCards = await Read(null, id); // Fetch all bingo cards for the user
                    setCards(userCards);
                } catch (error) {
                    console.error('Failed to fetch bingo cards for user:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBingoCards();
    }, [id]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {!id && (
                <Modal>
                    <LoginRedirect />
                </Modal>
            )}
            {id && !selectedCard && (
                cards.length ? <CardList cards={cards} fetchCard={fetchCard} /> : <CreateCard />
            )}
            {id && selectedCard && (
                <SelectedCard />
            )}
        </>
    );

    // Component to display the "Create" button if no cards are available
    function CreateCard() {
        return (
            <>
                <h2>Create Bingo Card</h2>
                <button onClick={create} disabled={loading}>Create</button>
            </>
        );
    }

    // Component to display the list of existing cards


    // Component to display the selected bingo card and the "Back" button
    function SelectedCard() {
        return (
            <div>
                <button onClick={() => setSelectedCard(null)}>Back to Cards</button>
                <BingoCard data={selectedCard.bricks} id={selectedCard.card_id} selectedCard={selectedCard} />
            </div>
        );
    }
}
