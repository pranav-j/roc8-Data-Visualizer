import axios from 'axios';
import Papa from "papaparse";

export const getSheetData = async (req, res) => {
    const url = 'https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/gviz/tq?tqx=out:csv';
    const { age, gender, startDate, endDate } = req.query;
    console.log({ age, gender, startDate, endDate });

    const convertDateFormat = (dateString) => {
        const parts = dateString.split('/'); // Split by '/'
        // Adjust to 'YYYY-MM-DD' format
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    };

    try {
        const response = await axios.get(url);
        const csvData = response.data;

        const parsedData = Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
        });

        const dataArray = parsedData.data.map(row => ({
            Day: row.Day,
            Age: row.Age,
            Gender: row.Gender,
            A: Number(row.A),
            B: Number(row.B),
            C: Number(row.C),
            D: Number(row.D),
            E: Number(row.E),
            F: Number(row.F),
        }));

        // Convert startDate and endDate to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const filteredData = dataArray.filter(item => {
            // Convert Day to the 'YYYY-MM-DD' format for comparison
            const itemDateString = convertDateFormat(item.Day);
            const itemDate = new Date(itemDateString); // Now this should be correctly parsed
            
            // console.log({ start, end }); 
            // console.log({ dayyyyyyy: item.Day });
            // console.log({ itemDate });

            return (
                item.Age === age &&
                item.Gender === gender &&
                itemDate >= start &&
                itemDate <= end
            );
        });

        res.status(200).json(filteredData);

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data from Google Sheets', error: error.message });
    }
};
