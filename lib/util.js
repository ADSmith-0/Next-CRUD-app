const toTitleCase = (text) => {
    const firstChar = text.slice(0, 1);
    const remaining = text.slice(1);
    return (firstChar.toUpperCase() + remaining);
}

export { toTitleCase };