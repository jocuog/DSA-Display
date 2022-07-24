

const HuffmanCompTree = () => {

    let maxX, maxY, minX, maximumDepth;

    // function to seperating charachters, counting the frequency and storing in an object
    const constructLettersObj = (inputString) => {  
        
        const lettersObj = {};

        // iterate through inputString and add 1 to the frequency to the value of the corresponding letter key
        for (const char of inputString) {
            if (!lettersObj[char]) {
                lettersObj[char] = {
                    frequency: 0,
                    hasBeenUsed: false,
                    childrenNodes: [],
                };
            }
            lettersObj[char].frequency++;
        }
        for (const lettersObj of Object.values(lettersObj)) {
            lettersObj.probability = lettersObj.frequency / inputString.length;
        }
        return lettersObj;
    }

    const onButtonClick = () => {
        console.log("click")
    }

    return (
        <div>
            <h2>Enter String Here:</h2><br/>
            <input type="text" id='input' value='Enter a string to encode'/>
            <button onClick={onButtonClick}>Encode!</button><br/>
            <h4>The Huffman encoded string is: <span id='output' style={{ fontFamily: 'monospace' }}></span></h4><br/>
            
        </div>
    )
}

export default HuffmanCompTree