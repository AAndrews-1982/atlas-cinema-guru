async function testAPI() {
    try {
      const response = await fetch("http://localhost:3000/api/titles");
      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  }
  
  testAPI();
  