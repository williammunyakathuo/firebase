const Add = () => {
    return (
        <div className="add">
            <input
                type="text"
                placeholder="title"
            />
            <input
                type="number"
                placeholder="date"
            />
            <input type="checkbox" />
            <label htmlFor="Oscar">Oscar</label>
            <button>Submit</button>
        </div>
    );
}

export default Add;