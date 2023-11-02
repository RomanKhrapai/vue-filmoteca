export const textToHtml = (text) => {
    const res1 = text.replace(/_(.*?)_(.*?)/g, "<em>$1</em> ");
    const res2 = res1.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const res = res2.split("\r\n\r\n").join("</p><p>");
    return "<p>" + res + "</p>";
};
