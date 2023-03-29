// Define the data
const data = [
    { outlook: 'Sunny',     temperature: 'Hot',   humidity: 'High',   wind: 'Weak',   playTennis: 'No' },
    { outlook: 'Sunny',     temperature: 'Hot',   humidity: 'High',   wind: 'Strong', playTennis: 'No' },
    { outlook: 'Overcast',  temperature: 'Hot',   humidity: 'High',   wind: 'Weak',   playTennis: 'Yes' },
    { outlook: 'Rainy',     temperature: 'Mild',  humidity: 'High',   wind: 'Weak',   playTennis: 'Yes' },
    { outlook: 'Rainy',     temperature: 'Cool',  humidity: 'Normal', wind: 'Weak',   playTennis: 'Yes' },
    { outlook: 'Rainy',     temperature: 'Cool',  humidity: 'Normal', wind: 'Strong', playTennis: 'No' },
    { outlook: 'Overcast',  temperature: 'Cool',  humidity: 'Normal', wind: 'Strong', playTennis: 'Yes' },
    { outlook: 'Sunny',     temperature: 'Mild',  humidity: 'High',   wind: 'Weak',   playTennis: 'No' },
    { outlook: 'Sunny',     temperature: 'Cool',  humidity: 'Normal', wind: 'Weak',   playTennis: 'Yes' },
    { outlook: 'Rainy',     temperature: 'Mild',  humidity: 'Normal', wind: 'Weak',   playTennis: 'Yes' },
    { outlook: 'Sunny',     temperature: 'Mild',  humidity: 'Normal', wind: 'Strong', playTennis: 'Yes' },
    { outlook: 'Overcast',  temperature: 'Mild',  humidity: 'High',   wind: 'Strong', playTennis: 'Yes' },
    { outlook: 'Overcast',  temperature: 'Hot',   humidity: 'Normal', wind: 'Weak',   playTennis: 'Yes' },
    { outlook: 'Rainy',     temperature: 'Mild',  humidity: 'High',   wind: 'Strong', playTennis: 'No' }
  ];
  
  // Define the decision tree function
  function predictTennis(newSample) {
    // Define the decision tree
    const tree = {
      outlook: {
        Sunny: {
          humidity: {
            High: 'No',
            Normal: {
              temperature: {
                Hot: 'No',
                Mild: 'Yes'
              }
            }
          }
        },
        Overcast: {
          humidity: {
            High: 'Yes',
            Normal: {
              wind: {
                Weak: 'Yes',
                Strong: 'Yes'
              }
            }
          }
        },
        Rainy: {
          wind: {
            Weak: {
              temperature: {
                Mild: 'Yes',
                Cool: 'Yes'
              }
            },
            Strong: 'No'
          }
        }
      }
    };
  
    // Traverse the tree and make a prediction for the new sample
    let node = tree;
    while (typeof node === 'object') {
      const status = Object.keys(node)[0];
      console.log("🛠️ ----------------------------------------------------------------------------------------------🛠️")
      console.log("🛠️  - file: playground_.js - Line:63 - predictTennis - Object.keys(node):\n", Object.keys(node))
      console.log("🛠️ ----------------------------------------------------------------------------------------------🛠️")
      
      console.log("🛠️ --------------------------------------------------------------------------🛠️")
      console.log("🛠️  - file: playground_.js - Line:63 - predictTennis - status:\n", status)
      console.log("🛠️ --------------------------------------------------------------------------🛠️")
      
      const value = newSample[status];
      console.log("🛠️ ----------------------------------------------------------------------🛠️")
      console.log("🛠️  - file: playground_.js - Line:67 - predictTennis - value:\n", value)
      console.log("🛠️ ----------------------------------------------------------------------🛠️")
      
      node = node[status][value];
      console.log("🛠️ --------------------------------------------------------------------🛠️")
      console.log("🛠️  - file: playground_.js - Line:71 - predictTennis - node:\n", node)
      console.log("🛠️ --------------------------------------------------------------------🛠️")
      
    }
    return node;
  }
  
  // Test the decision tree on a new sample
  const newSample = { outlook: 'Sunny', temperature: 'Mild', humidity: 'Normal', wind: 'Strong' };
  const prediction = predictTennis(newSample);
  console.log('Prediction:', prediction);  // Output: "No"
  