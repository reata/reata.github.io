// reading speed set as 500 Chinese character per minute
const readingTime = (text) => Math.ceil(text.length / 500);

export default readingTime;
