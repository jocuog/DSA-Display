

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

    const handleOnChange = (e) => {
        console.log(e.target.value)
        const inputString = e.target.value
    }

    return (
        <div>
            <h2>Huffman Code Compression Tree</h2><br/>

            <input 
                type="text" 
                id='input' 
                onChange={handleOnChange}
                placeholder='Enter String to Encode' />

            <button >Encode!</button><br/>

            <h4>The Huffman encoded string is: 
                <span id='output' style={{ fontFamily: 'monospace' }}></span>
            </h4><br/>

            <span 
                id='diagramSpan' 
                style={{display: 'block', width: '100%', height: '50%', overfolow: 'scroll'}}>
                    <svg id='tree'></svg>
                        <table id='hoffman-table'></table><br/> 
                            <p>The average length of a symbol in the Huffman code is <span id='avgLength'>0</span> bits.</p>
                            <p>The average length of a symbol in the equal-length code is <span id='bitsInEqualCode'>0</span>bits.</p>
                            <p>The entropy of the input string is <span id='entropy'>0</span>bits.</p>
            </span>
        </div>
    )
}

export default HuffmanCompTree