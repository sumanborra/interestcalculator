
import './App.css';
import {useState} from "react"

function App() {
  const[startDate, setStartDate] = useState("")
  const[endDate, setEndDate] = useState("")
  const[amount, setAmount] = useState(0)
  const[interest, setInterest] = useState(0)
  const[showResults, setShowResults] = useState({isTrue:false,results:{}})
  const[totalInterest, setTotalInterest] = useState(0);
  const[errMessage, setErrMessage] = useState({iserr:false,errMsg:""})
  const[theme, setTheme] = useState(false)
  const[language, setLanguage] = useState("English")
  


  const setStartdte = (e) =>{
    setStartDate(e.target.value);
  }
  const setEndDte = (e) =>{
    setEndDate(e.target.value);
  }
  
  const submitFormDetails = (e) =>{
    e.preventDefault();
    if(amount !== "" && interest !== "" && startDate !== "" & endDate !== ""){
    const results = getDateDifference(startDate,endDate)
    setShowResults({...showResults,isTrue:true,results})
    setErrMessage({...errMessage, iserr:false, errMsg:""})
    }
    else{
      setErrMessage({...errMessage, iserr:true, errMsg:"Please Enter all input values"})
      setShowResults({...showResults,isTrue:false})
    }
  }
  const getDateDifference = (startDate, endDate)=> {
    // Ensure startDate is before endDate
    if (startDate > endDate) {
      [startDate, endDate] = [endDate, startDate]; // Swap dates
    }
    startDate = new Date(startDate);
    endDate = new Date(endDate)
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();
  
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const endDay = endDate.getDate();
  
    let years = endYear - startYear;
    let months = endMonth - startMonth;
    let days = endDay - startDay;
  
    // Handle negative days
    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonthLastDay = new Date(endYear, endMonth, 0).getDate();
      days += prevMonthLastDay;
    }
  
    // Handle negative months
    if (months < 0) {
      years--;
      months += 12;
    }
    const convertYearsToMonths = (years*12) + months + days/30
    const interestAmountOfPrice = (convertYearsToMonths*amount*interest/100).toFixed(2)
    setTotalInterest(interestAmountOfPrice)
    
    
  const result = {years,months,days}
    return result;
  }
  const changeTheme = () =>{
    setTheme(prevState => !prevState)
  }
  const changeLanguage = (e) =>{
    setLanguage(e.target.value)
  }
  const inputStyleColor = ((errMessage.iserr) ? "input-element-border-red":"input-element-border-green")
  const backgroundTheme = ((theme)?"background-color-darkmode":"background-color-lightmode")
  const themeText = ((theme)?"Light":"Dark")
  const resultsPage = () =>{
    
    switch(language){
      case "English":
          return englishPage();
      case "Telugu":
        return teluguPage();
      default:
        return null;
    }
  }
  const teluguPage = () =>{
    return(
      <>
        <div className='form-main-container'>
        <div className='header-section'>
          <h1 className="heading">మీ రుణ మొత్తానికి వడ్డీని ఇక్కడ లెక్కించండి</h1>
          <button type="button" className='buttnchange' onClick={changeTheme}>{themeText}</button>
          <select className='select-element' value={language} onChange={changeLanguage}>
            <option value="English">English</option>
            <option value="Telugu">తెలుగు</option>
          </select>
        </div>
        <p className='para-text'>(100 రూపాయలకు ఒక నెలకు వడ్డీని రూపాయల్లో ఇవ్వండి)</p>
      <form className="form-container" onSubmit={submitFormDetails}>
        {errMessage !== "" && <p className='errorMsg'>{errMessage.errMsg}</p>}
        <label htmlFor="startDate" className='start-date-in-telugu'>ఇచ్చిన తేదీ <span className="span-style-for-form span-style-for-telugu-form">:</span> </label>
          <input type="date" id="startDate" className={`input-element ${inputStyleColor}`} onChange={setStartdte} value={startDate}/><br/><br/>
          <label htmlFor="endDate" className='start-date-in-telugu'>తీసుకునే తేదీ <span className="span-style-for-form">:</span> </label>
          <input type="date" id="endDate" className={`input-element ${inputStyleColor}`} onChange={setEndDte} value={endDate}/><br/><br/>
          <label htmlFor="amount" className='start-date-in-telugu'>ఇచ్చిన అప్పు <span className="span-style-for-form span-style-for-form-telugu-amount">:</span></label>
          <input type="text" id="amount" className={`input-element-amount input-element-amount-telugu ${inputStyleColor}`} onChange={(e)=>setAmount(e.target.value)} value={amount}/><br/><br/>
          <label htmlFor="interest" className='start-date-in-telugu'>నెలకు వడ్డీ   <span className="span-style-for-form span-style-for-telugu-form-interest">:</span></label>
          <input type="text" id="interest" className={`input-element-interest ${inputStyleColor}`} onChange={(e)=>setInterest(e.target.value)} value={interest}/><br/>
          <div className="buttn-container">
          <button type="submit" className="buttn buttn-in-telugu">సమర్పించండి</button>
          </div>
          </form>
          {showResults.isTrue && <hr className='hr-line-style'/>}
          {showResults.isTrue && <div className='results-container'>
          <p className='result-text'><span className="amount-value-span-style">{showResults.results.years}</span>సంవత్సరాల, <span className="amount-value-span-style">{showResults.results.months}</span>నెలల, <span className="amount-value-span-style">{showResults.results.days}</span>రోజులు</p>
          <p className='result-text'>ఇచ్చిన అప్పు: <span className="amount-value-span-style">{amount}/- రూ,,</span></p>
          <p className='result-text'>నెలకు వడ్డీ రేటు : <span className="amount-value-span-style">{interest}/- రూ,,</span></p>
          <p className='result-text'> మొత్తం వడ్డీ : <span className="amount-value-span-style">{totalInterest}/- రూ,,</span></p>
          <p className='result-text'>చెల్లించాల్సిన మొత్తం  :<span className="amount-value-span-style">{parseInt(amount)+parseFloat(totalInterest)}/- రూ,,</span></p>
          </div>}
      </div>
      </>
    )
  }
  const englishPage = () =>{
    return(<>
      <div className='form-main-container'>
        <div className='header-section'>
          <h1 className="heading">Calculate Interest For Your Loan Amount Here</h1>
          <button type="button" className='buttnchange' onClick={changeTheme}>{themeText}</button>
          <select className='select-element' value={language} onChange={changeLanguage}>
            <option value="English">English</option>
            <option value="Telugu">తెలుగు</option>
          </select>
        </div>
        <p className='para-text'>(Give the interest in rupees for 100 for one month)</p>
      <form className="form-container" onSubmit={submitFormDetails}>
        {errMessage !== "" && <p className='errorMsg'>{errMessage.errMsg}</p>}
        <label htmlFor="startDate">StartDate: </label>
          <input type="date" id="startDate" className={`input-element ${inputStyleColor}`} onChange={setStartdte} value={startDate}/><br/><br/>
          <label htmlFor="endDate">EndDate<span className="span-style-for-form">:</span> </label>
          <input type="date" id="endDate" className={`input-element ${inputStyleColor}`} onChange={setEndDte} value={endDate}/><br/><br/>
          <label htmlFor="amount">Amount  <span className="span-style-for-form">:</span></label>
          <input type="text" id="amount" className={`input-element-amount ${inputStyleColor}`} onChange={(e)=>setAmount(e.target.value)} value={amount}/><br/><br/>
          <label htmlFor="interest">Interest  : </label>
          <input type="text" id="interest" className={`input-element-interest ${inputStyleColor}`} onChange={(e)=>setInterest(e.target.value)} value={interest}/><br/>
          <div className="buttn-container">
          <button type="submit" className="buttn">Submit</button>
          </div>
          </form>
          {showResults.isTrue && <hr className='hr-line-style'/>}
          {showResults.isTrue && <div className='results-container'>
          <p className='result-text'><span className="amount-value-span-style">{showResults.results.years}</span>Years, <span className="amount-value-span-style">{showResults.results.months}</span>Months, <span className="amount-value-span-style">{showResults.results.days}</span>Days</p>
          <p className='result-text'>Amount: <span className="amount-value-span-style">{amount}/- Rs</span></p>
          <p className='result-text'>Interest rate for month : <span className="amount-value-span-style">{interest}/- Rs</span></p>
          <p className='result-text'> Total Interest is : <span className="amount-value-span-style">{totalInterest}/- Rs</span></p>
          <p className='result-text'>Total Amount You Pay : <span className="amount-value-span-style">{parseFloat(amount)+parseFloat(totalInterest)}/- Rs</span></p>
          </div>}
      </div>
    </>)
  }
  return (
    <div className={`App ${backgroundTheme}`}>
      {resultsPage()}
    </div>
  );
}

export default App;
