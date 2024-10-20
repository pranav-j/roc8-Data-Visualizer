// import "./../styles/dataFilter.css";
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { fetchFilteredData, setFilterValues, clearFilterValues } from '../redux/slices/dataSlice';

// function DataFilter() {
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [age, setAge] = useState('');
//     const [gender, setGender] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [copied, setCopied] = useState(false);

//     const updateURLParams = () => {
//         const queryParams = new URLSearchParams();
//         if (age) queryParams.append('age', age);
//         if (gender) queryParams.append('gender', gender);
//         if (startDate) queryParams.append('startDate', startDate);
//         if (endDate) queryParams.append('endDate', endDate);

//         navigate(`/dashboard?${queryParams.toString()}`, { replace: true });
//     };

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const ageParam = queryParams.get('age') || '';
//         const genderParam = queryParams.get('gender') || '';
//         const startDateParam = queryParams.get('startDate') || '';
//         const endDateParam = queryParams.get('endDate') || '';

//         setAge(ageParam);
//         setGender(genderParam);
//         setStartDate(startDateParam);
//         setEndDate(endDateParam);

//         dispatch(setFilterValues({ age: ageParam, gender: genderParam, startDate: startDateParam, endDate: endDateParam }));
//     }, [location.search, dispatch]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(fetchFilteredData({ age, gender, startDate, endDate }));
//         updateURLParams();
//     };

//     const handleClear = () => {
//         setAge('');
//         setGender('');
//         setStartDate('');
//         setEndDate('');
//         dispatch(clearFilterValues());
//         navigate('/dashboard', { replace: true }); // Clear query params in the URL
//     };

//     const handleShareURL = () => {
//         const currentURL = window.location.href;
//         navigator.clipboard.writeText(currentURL)
//             .then(() => {
//                 setCopied(true); // Show "Copied to clipboard" message
//                 setTimeout(() => setCopied(false), 3000); // Hide message after 3 seconds
//             })
//             .catch((err) => {
//                 console.error('Failed to copy the URL:', err);
//             });
//     };

//     return (
//         <div className="data-filter">
//             <div className="filter-header">
//                 <h1>Data Filter</h1>
//                 <div className="share-url-container">
//                     {copied && <span className="copied-message">Copied to clipboard!</span>}
//                     <button className="share-url-button" onClick={handleShareURL}>
//                         Share URL
//                     </button>                   
//                 </div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs">
//                     <label>
//                         Age:
//                         <select value={age} onChange={(e) => setAge(e.target.value)}>
//                             <option value="">Select Age</option>
//                             <option value="15-25">15 - 25</option>
//                             <option value=">25">{">25"}</option>
//                         </select>
//                     </label>

//                     <label>
//                         Gender:
//                         <select value={gender} onChange={(e) => setGender(e.target.value)}>
//                             <option value="">Select Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                         </select>
//                     </label>

//                     <label>
//                         Start Date:
//                         <input
//                             type="date"
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                         />
//                     </label>

//                     <label>
//                         End Date:
//                         <input
//                             type="date"
//                             value={endDate}
//                             onChange={(e) => setEndDate(e.target.value)}
//                         />
//                     </label>
//                 </div>
//                 <div className="button-group">
//                     <button type="submit">Filter</button>
//                     <button type="button" className="clear-button" onClick={handleClear}>
//                         Clear Filter
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default DataFilter;


// ---------------------------------------------------------------------------------------------------------------

import "./../styles/dataFilter.css";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchFilteredData, setFilterValues, clearFilterValues } from '../redux/slices/dataSlice';

// Helper function to get filter values from cookies
const getFilterValueFromCookie = (filterName) => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(row => row.startsWith(`${filterName}=`));
    if (cookie) {
        return decodeURIComponent(cookie.split('=')[1]);
    }
    return '';
};

function DataFilter() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // Initialize state with cookie values if they exist
    const [age, setAge] = useState(getFilterValueFromCookie('age'));
    const [gender, setGender] = useState(getFilterValueFromCookie('gender'));
    const [startDate, setStartDate] = useState(getFilterValueFromCookie('startDate'));
    const [endDate, setEndDate] = useState(getFilterValueFromCookie('endDate'));
    const [copied, setCopied] = useState(false);

    const updateURLParams = () => {
        const queryParams = new URLSearchParams();
        if (age) queryParams.append('age', age);
        if (gender) queryParams.append('gender', gender);
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);

        navigate(`/dashboard?${queryParams.toString()}`, { replace: true });
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        // Prioritize URL params over cookie values
        const ageParam = queryParams.get('age') || getFilterValueFromCookie('age');
        const genderParam = queryParams.get('gender') || getFilterValueFromCookie('gender');
        const startDateParam = queryParams.get('startDate') || getFilterValueFromCookie('startDate');
        const endDateParam = queryParams.get('endDate') || getFilterValueFromCookie('endDate');

        setAge(ageParam);
        setGender(genderParam);
        setStartDate(startDateParam);
        setEndDate(endDateParam);

        // If we have any values from cookies or URL, dispatch them to Redux
        if (ageParam || genderParam || startDateParam || endDateParam) {
            dispatch(setFilterValues({ 
                age: ageParam, 
                gender: genderParam, 
                startDate: startDateParam, 
                endDate: endDateParam 
            }));
            // Update URL if values came from cookies
            if (!location.search) {
                updateURLParams();
            }
        }
    }, [location.search, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchFilteredData({ age, gender, startDate, endDate }));
        updateURLParams();
    };

    const handleClear = () => {
        setAge('');
        setGender('');
        setStartDate('');
        setEndDate('');
        dispatch(clearFilterValues());
        navigate('/dashboard', { replace: true });
    };

    const handleShareURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            })
            .catch((err) => {
                console.error('Failed to copy the URL:', err);
            });
    };

    return (
        <div className="data-filter">
            <div className="filter-header">
                <h1>Data Filter</h1>
                <div className="share-url-container">
                    {copied && <span className="copied-message">Copied to clipboard!</span>}
                    <button className="share-url-button" onClick={handleShareURL}>
                        Share URL
                    </button>                   
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <label>
                        Age:
                        <select value={age} onChange={(e) => setAge(e.target.value)}>
                            <option value="">Select Age</option>
                            <option value="15-25">15 - 25</option>
                            <option value=">25">{">25"}</option>
                        </select>
                    </label>

                    <label>
                        Gender:
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>

                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>

                    <label>
                        End Date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                </div>
                <div className="button-group">
                    <button type="submit">Filter</button>
                    <button type="button" className="clear-button" onClick={handleClear}>
                        Clear Filter
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DataFilter;