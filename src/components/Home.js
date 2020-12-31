
import '../css/Home.css'

import megaImg from '../images/mega-mill.png'
import pick_6 from '../images/pick-62.png'
import power_ball from '../images/power-ball.png'

import cardbg from '../images/lottery-bg.png'
import cardbottombg from '../images/menubtnbg.png'
import header from '../images/header.png'

import Grid from '@material-ui/core/Grid';
import DropDown from './DropDownList';
import Button from '@material-ui/core/Button'
import { useEffect, useState } from 'react'
import Axios from 'axios'


const m = require('./Data')
const countriesData = m.countriesData
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function Home() {

    const [state, setState] = useState('Alabama');
    const [mega, setMega] = useState({});
    const [pick, setPick] = useState({});
    const [power, setPower] = useState({});
    
    useEffect(()=>{
        Axios.get('https://lotterycash.herokuapp.com/api/jackpot/mega'
          ).then(response =>  {
            setMega(response.data)    
          }).catch(err =>{
        });
    }, [])

    useEffect(()=>{
        Axios.get('https://lotterycash.herokuapp.com/api/jackpot/pick6'
          ).then(response =>  {
            setPick(response.data)    
          }).catch(err =>{
        });
    }, [])

    useEffect(()=>{
        Axios.get('https://lotterycash.herokuapp.com/api/jackpot/power'
          ).then(response =>  {
            setPower(response.data)    
          }).catch(err =>{
        });
    }, [])

    let today = new Date();
    let powerDate, megaDate, pickDate
    
    if([0,1,2,3].includes(today.getDay()))
    {
        console.log(today.getDay(),today.getHours()," if")

        if(today.getDay() == 3 && today.getHours()>=23)
        {
            powerDate = 'Saturday 10:59 PM ET'
        }
        else
            powerDate = 'Wednesday 10:59 PM ET'
    }
    else
    {
        console.log(today.getDay(),today.getHours()," else")
        if(today.getDay() == 6 && today.getHours()>=23)
        {
            powerDate = 'Wednesday 10:59 PM ET'
        }
        else
            powerDate = 'Saturday 10:59 PM ET'
    }
    
    if([6,0,1,2].includes(today.getDay()))
    {
        console.log(today.getDay(),today.getHours()," if")

        if(today.getDay() == 2 && today.getHours()>=23)
        {
            megaDate = 'Friday 10:59 PM ET'
        }
        else
            megaDate = 'Tuesday 10:59 PM ET'
    }
    else
    {
        console.log(today.getDay(),today.getHours()," else")
        if(today.getDay() == 5 && today.getHours()>=23)
        {
            megaDate = 'Tuesday 10:59 PM ET'
        }
        else
            megaDate = 'Friday 10:59 PM ET'
    }

    if([5,6,0,1].includes(today.getDay()))
    {
        console.log(today.getDay(),today.getHours()," if")

        if(today.getDay() == 1 && today.getHours()>=23)
        {
            pickDate = 'Thursday  07:59 PM ET'
        }
        else
            pickDate = 'Monday 07:59 PM ET'
    }
    else
    {
        console.log(today.getDay(),today.getHours()," else")
        if(today.getDay() == 4 && today.getHours()>=23)
        {
            pickDate = 'Monday 07:59 PM ET'
        }
        else
            pickDate = 'Thursday 07:59 PM ET'
    }

    let megaFederalTax, megaStateTax
    if(Object.keys(mega).length != 0)
    {
        megaFederalTax = calculateTaxFederal(mega.cashvalue)    
        megaStateTax = calculateTaxState(state,mega.cashvalue)
    }

    let pickFederalTax, pickStateTax
    if(Object.keys(pick).length != 0)
    {
        pickFederalTax = calculateTaxFederal(pick.cashvalue)    
        pickStateTax = calculateTaxState(state,pick.cashvalue)
    }

    let powerFederalTax, powerStateTax
    if(Object.keys(power).length != 0)
    {
        powerFederalTax = calculateTaxFederal(power.cashvalue)    
        powerStateTax = calculateTaxState(state,power.cashvalue)
    }
        
    return (
        <div>
            <Grid container style={{
                paddingTop:'50px',}
                }>
                <Grid item xs={12} sm={12} md={12}>
                    <div className='container'>
                        <div className="selected-state-btn" >
                            SELECTED STATE
                        </div>
                        <div className='dropdown'>
                            <DropDown data={countriesData} value={state} setData={setState} />    
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{
                    paddingTop:'10px',
                    paddingBottom: '50px'}
                 }>
                <Grid item xs={12} sm={12} md={9}>
                    <Grid container>
                        <Grid item  xs={12} sm={4} md={4}>
                            <div className='main-cardHome' >
                            <div className='cardimg' style={{backgroundImage:`url(${power_ball})`}} >
                            </div>
                            <div className='cardbg' style={{backgroundImage:`url(${cardbg})`}}>
                                
                                <div className="textMega"> Power Ball</div>
                                <div className="text-gradient textPayout"> NEXT PAYOUT</div>
                                <div className="textAfter"> AFTER TAXS*</div>
                                <div className="textAmount"> {`$ ${Object.keys(power).length != 0 ?  formatCurrency(Math.round(power.cashvalue - (powerFederalTax + powerStateTax))) : 'N/A'}`} </div>
                                <div className='displayFlexCol'> 
                                    <div className="displayFlexRow itemCardHome">
                                        <div>Jackpot:</div>
                                        <div>{`$ ${Object.keys(power).length != 0 ?  formatCurrency(Math.round(power.jackpot)) : 'N/A'}`}</div>
                                    </div>
                                    <div className="displayFlexRow itemCardHome">
                                        <div>Cash Value:</div>
                                        <div>{`$ ${Object.keys(power).length != 0 ?  formatCurrency(Math.round(power.cashvalue)) : 'N/A'}`}</div>
                                    </div>
                                    <div className="displayFlexRow itemCardHome">
                                        <div>Federal Tax:</div>
                                        <div>{`$ ${Object.keys(power).length != 0 ?  formatCurrency(Math.round(powerFederalTax)) : 'N/A'}`}</div>
                                    </div>
                                    <div className="displayFlexRow itemCardHome">
                                        <div>State Tax:</div>
                                        <div>{`$ ${Object.keys(power).length != 0 ?  formatCurrency(Math.round(powerStateTax)) : 'N/A'}`}</div>
                                    </div>
                                </div>
                                <div className='textNext'> NEXT DRAWING</div>
                                    <div className='textDate'>
                                        {`${ powerDate }`}
                                    </div>
                                <div className="playbtn"> 
                                    <a href="https://apps.apple.com/us/app/jackpocket-lottery-app/id663046683" style={{textDecoration:'none', color:'white'}}> 
                                        PLAY NOW
                                    </a>
                                </div>
                            </div>
                            <div className='cardbottombg' style={{backgroundImage:`url(${cardbottombg})`}}>
                            </div>
                        </div>
                        </Grid>
                        <Grid item  xs={12} sm={4} md={4}>
                        <div className='main-cardHome' >
                            <div className='cardimg' style={{backgroundImage:`url(${megaImg})`}} >
                            </div>
                            <div className='cardbg' style={{backgroundImage:`url(${cardbg})`}}>
                                
                                <div className="textMega"> MEGA MILLIONS</div>
                                <div className="text-gradient textPayout"> NEXT PAYOUT</div>
                                <div className="textAfter"> AFTER TAXS*</div>
                                <div className="textAmount">{`$ ${Object.keys(mega).length != 0 ? formatCurrency(Math.round(mega.cashvalue - (megaFederalTax + megaStateTax))) : 'N/A'}`}</div>
                                <div className='displayFlexCol'> 
                                    <div className="displayFlexRow itemCardHome">
                                        <div>Jackpot:</div>
                                        <div>{`$ ${Object.keys(mega).length != 0 ?  formatCurrency(Math.round(mega.jackpot)) : 'N/A'}`}</div>
                                    </div>
                                    <div className="displayFlexRow itemCardHome">
                                        <div>Cash Value:</div>
                                        <div>{`$ ${Object.keys(mega).length != 0 ?  formatCurrency(Math.round(mega.cashvalue))  : 'N/A'}`}</div>
                                    </div>
                                    <div className="displayFlexRow itemCardHome">
                                        <div>Federal Tax:</div>
                                        <div>{`$ ${Object.keys(mega).length != 0 ?  formatCurrency(Math.round(megaFederalTax))  : 'N/A'}`}</div>
                                    </div>
                                    <div className="displayFlexRow itemCardHome">
                                        <div>State Tax:</div>
                                        <div>{`$ ${Object.keys(mega).length != 0 ?  formatCurrency(Math.round(megaStateTax))  : 'N/A'}`}</div>
                                    </div>
                                </div>
                                <div className='textNext'> NEXT DRAWING</div>
                                <div className='textDate'> 
                                    {`${ megaDate }`}
                                </div>
                                <div className="playbtn" >
                                    <a href="https://apps.apple.com/us/app/jackpocket-lottery-app/id663046683" style={{textDecoration:'none', color:'white'}}> 
                                        PLAY NOW
                                    </a>
                                </div>
                            </div>
                            <div className='cardbottombg' style={{backgroundImage:`url(${cardbottombg})`}}>
                            </div>
                        </div>
                        </Grid>
                        <Grid item  xs={12} sm={4} md={4}>
                        <div className='main-cardHome' >
                            <div className='cardimg' style={{backgroundImage:`url(${pick_6})`}} >
                            </div>
                            <div className='cardbg' style={{backgroundImage:`url(${cardbg})`}}>
                                
                                <div className="textMega"> Pick 6</div>
                                <div className="text-gradient textPayout"> NEXT PAYOUT</div>
                                <div className="textAfter"> AFTER TAXS*</div>
                                <div className="textAmount">{`$ ${Object.keys(pick).length != 0 ?  formatCurrency(Math.round(pick.cashvalue - (pickFederalTax + pickStateTax))) : 'N/A'}`}</div>
                                <div className='displayFlexCol'> 
                                    <div className="displayFlexRow itemCardHome">
                                        <div>Jackpot:</div>
                                        <div>{`$ ${Object.keys(pick).length != 0 ?  formatCurrency(Math.round(pick.jackpot)) : 'N/A'}`}</div>
                                    </div>
                                    <div className="displayFlexRow itemCardHome">
                                        <div>Cash Value:</div>
                                        <div>{`$ ${Object.keys(pick).length != 0 ?  formatCurrency(Math.round(pick.cashvalue)) : 'N/A'}`}</div>
                                    </div>
                                    <div className="displayFlexRow itemCardHome">
                                        <div>Federal Tax:</div>
                                        <div>{`$ ${Object.keys(pick).length != 0 ?  formatCurrency(Math.round(pickFederalTax)) : 'N/A'}`}</div>
                                    </div>
                                    <div className="displayFlexRow itemCardHome">
                                        <div>State Tax:</div>
                                        <div>{`$ ${Object.keys(pick).length != 0 ?  formatCurrency(Math.round(pickStateTax)) : 'N/A'}`}</div>
                                    </div>
                                </div>
                                <div className='textNext'> NEXT DRAWING</div>
                                <div className='textDate'> 
                                    {`${ pickDate }`}
                                </div>
                                <div className="playbtn"> 
                                    <a href="https://apps.apple.com/us/app/jackpocket-lottery-app/id663046683" style={{textDecoration:'none', color:'white'}}> 
                                        PLAY NOW
                                    </a>
                                </div>
                            </div>
                            <div className='cardbottombg' style={{backgroundImage:`url(${cardbottombg})`}}>
                            </div>
                        </div>
                        </Grid>                        
                   </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <div className='mainadd-card'>
                        <div className='cardaddbg' style={{backgroundImage:`url(${cardbg})`}}>
                        </div>
                        <div className='cardaddbottombg' style={{backgroundImage:`url(${cardbottombg})`}}>
                            
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{
                    paddingTop:'20px',}
                }>
                    <Grid item xs={12} sm={12} md={12}>
                        <div className='about-lottery'>
                            ABOUT LOTTERY CASH VALUE:
                        </div>
                        <div className="about-text">
                            Do you want to know how much of the advertised Powerball or Mega-Millions jackpot would really
                            arrive on your bank account if you win?
                            your bank account. The advertised Jackpot assumes that you will choose a annuity pay out,
                            which means you will get a certain $ value each year. This is not recommended and you will
                            discounts the total value paid out - and that is how the “Cash Value” is calculated.
                            Cash value is the amount that you will still have to tax - and on Federal and potentially state
                            level. After the calculation is done, what really arrives on your bank account is a fraction of
                            the advertised jackpot and is approximately 45%. Our example calculation is based on 
                        </div>
                    </Grid>
                </Grid>
        </div>
    );
}

function calculateTaxFederal(amount){

    var limits = [9699,  39474,  84199,  160724,  204099, 510299, 510300].reverse()
    var percents = [10,  12,  22,  24,  32,  35,  37].reverse()
    return calculateTax(amount,limits,percents)
            
}

function calculateTaxState(state, amount){

    switch(state)
    {
        case 'Alabama':
            
            var limits = [499,2999,3000].reverse()
            var percents = [2.00,4.00,5.00].reverse()
            return calculateTax(amount,limits,percents)
            
        case 'Alaska':
            return 0;        
        
        case 'Arizona':
        
            var limits = [11047,27613,55225,165673,165674].reverse()
            var percents = [2.59,2.88,3.36,4.24,4.54].reverse()
            
            return calculateTax(amount,limits,percents)
            
        case 'Arkansas':

            var limits = [4499, 8899, 13399, 22199, 37199, 37200].reverse()
            var percents = [0.99, 2.50, 3.50, 4.50, 5.00, 6.90 ].reverse()
            return calculateTax(amount,limits,percents)
            
        case 'California':
        
            var limits = [8543, 20254, 31968, 44376, 56084, 286491, 343787, 572979, 999999, 1000000].reverse()
            var percents = [1.00, 2.00, 4.00, 6.00, 8.00, 9.30, 10.30, 11.30, 12.30, 13.30].reverse()
            return calculateTax(amount,limits,percents)
        
        case 'Colorado':
            return (4.63 * amount)/100;
        
        case 'Connecticut':
            
            var limits = [9999,49999,99999,199999,249999,499999,500000].reverse()
            var percents = [3.00,5.00,5.50,6.00,6.50,6.90,6.99].reverse()
            return calculateTax(amount,limits,percents)
            
        case 'Delaware':
            
            var limits = [1999, 4999, 9999, 19999, 24999, 59999, 60000].reverse()
            var percents = [2.00, 2.20, 3.90, 4.80, 5.20, 5.55, 6.60].reverse()
            return calculateTax(amount,limits,percents)
            
        case 'Florida':
            return 0;
        
        case 'Georgia':
        
            var limits = [749, 2249, 3749, 5249,6999, 7000].reverse()
            var percents = [1.00, 2.00, 3.00, 4.00, 5.00, 5.75].reverse()
            return calculateTax(amount,limits,percents)
        
        case 'Hawaii':
            
            var limits = [2300, 4799, 9599, 14399, 19199, 23999, 35999, 47999, 149999, 174999, 199999, 200000].reverse()
            var percents = [1.4, 3.2, 5.5, 6.4, 6.8, 7.2, 7.6, 7.9, 8.25, 9, 10, 11].reverse()
            return calculateTax(amount,limits,percents)

        case 'Idaho':

            var limits = [1540, 3080, 4621, 6161, 7702, 11553, 11554].reverse()
            var percents = [1.13,3.13,3.63,4.63,5.63,6.63,6.93].reverse()            
            return calculateTax(amount,limits,percents)

        case 'Illinois':
            return (4.95 * amount)/100;
        
        case 'Indiana':
            return (3.23 * amount)/100;
        
        case 'Iowa':

            var limits = [ 1637, 3275, 6551, 14741, 24569, 32759, 49139, 73709, 73710].reverse()
            var percents = [0.33,0.67,2.25,4.14,5.63,5.96,6.25,7.44,8.53].reverse()            
            return calculateTax(amount,limits,percents)

        case 'Kansas':

            var limits = [ 2499,14999, 29999, 30000].reverse()
            var percents = [2.00, 3.10, 5.25, 5.70].reverse()            
            return calculateTax(amount,limits,percents)
        
        case 'Kentucky':
            return (5.00 * amount)/100;
        
        case 'Louisiana':

            var limits = [ 12499, 49999, 50000].reverse()
            var percents = [2.00, 4.00, 6.00].reverse()            
            return calculateTax(amount,limits,percents)
        
        case 'Maine':
        
            var limits = [ 21849, 51699, 51700 ].reverse()
            var percents = [5.80, 6.75, 7.15].reverse()            
            return calculateTax(amount,limits,percents)
    
        case 'Maryland':
               
            var limits = [ 999, 1999, 2999, 99999, 124999, 149999, 249999, 250000].reverse()
            var percents = [2.00,  3.00,  4.00,  4.75,  5.00,  5.25,  5.50,  5.75].reverse()            
            return calculateTax(amount,limits,percents)
        
        case 'Massachusetts':
            return (5.05 * amount)/100;
        
        case 'Michigan':
            return (4.25 * amount)/100;
        
        case 'Minnesota':
    
            var limits = [26519, 87109, 163889, 163890].reverse()
            var percents = [5.35, 7.05, 7.85, 9.85].reverse()            
            return calculateTax(amount,limits,percents)
    
        case 'Mississippi':
    
            var limits = [999, 4999, 9999, 10000].reverse()
            var percents = [2.00, 3.00, 4.00, 5.00].reverse()            
            return calculateTax(amount,limits,percents)
    
        case 'Missouri':
    
            var limits = [1052,  2105,  3158,  4211,  5264,  6317,  7370, 8423, 8424].reverse()
            var percents = [1.50 ,2.00 ,2.50 ,3.00 ,3.50 ,4.00 ,4.50 ,5.00 ,5.40].reverse()            
            return calculateTax(amount,limits,percents)
    
        case 'Montana':
    
            var limits = [ 3099, 5399, 8199, 11099, 14299, 18399, 18400].reverse()
            var percents = [1.00 ,2.00 ,3.00 ,4.00 ,5.00 ,6.00 ,6.90].reverse()            
            return calculateTax(amount,limits,percents)
    
        case 'Nebraska':

            var limits = [ 3289, 19719, 31779, 31780].reverse()
            var percents = [2.46, 3.51, 5.01, 6.84].reverse()            
            return calculateTax(amount,limits,percents)

        case 'Nevada':
            return 0;
    
        case 'New Hampshire':
            return (5.00 * amount)/100;
        
        case 'New Jersey':
        
            var limits = [ 19999, 34999, 39999, 74999, 499999, 4999999, 5000000].reverse()
            var percents = [1.40 ,1.75 ,3.50 ,5.53 ,6.37 ,8.97 ,10.75].reverse()            
            return calculateTax(amount,limits,percents)

        case 'New Mexico':

            var limits = [5499, 10999, 15999, 16000].reverse()
            var percents = [1.70, 3.20, 4.70, 4.90].reverse()            
            return calculateTax(amount,limits,percents)
    
        case 'New York':

            var limits = [ 8499, 11699, 13899, 21399, 80649, 215399, 1077549, 1077550].reverse()
            var percents = [4.00 ,4.50 ,5.25 ,5.90 ,6.21 ,6.49 ,6.85 ,8.82].reverse()            
            return calculateTax(amount,limits,percents)
    
        case 'North Carolina':
            return (5.25 * amount)/100;    
    
        case 'North Dakota':

        
            var limits = [39449 ,95499 ,199249 ,433199 ,433200].reverse()
            var percents = [1.10 ,2.04 ,2.27 ,2.64 ,2.90].reverse()            
            return calculateTax(amount,limits,percents)

        case 'Ohio':

            var limits = [ 10849 ,16299 ,21749 ,43449 ,86899 ,108699, 217399, 217400].reverse()
            var percents = [1.00,1.98 ,2.75 ,2.97 ,3.47 ,3.96 ,4.60 ,5.00].reverse()            
            return calculateTax(amount,limits,percents)

        case 'Oregon':
        
            var limits = [3549, 8899, 124999, 125000].reverse()
            var percents = [5.00, 7.00, 9.00, 9.90].reverse()            
            return calculateTax(amount,limits,percents)

        case 'Pennsylvania':
            return (3.07 * amount)/100;
        
        case 'Rhode Island':

            var limits = [64049, 145599, 145600].reverse()
            var percents = [3.75, 4.75, 5.99].reverse()            
            return calculateTax(amount,limits,percents)

        
        case 'South Carolina':

            var limits = [ 2449, 4899, 7349, 9799, 12249, 12250].reverse()            
            var percents = [1.10 ,3.00 ,4.00 ,5.00 ,6.00 ,7.00].reverse()
            return calculateTax(amount,limits,percents)

        case 'South Dakota':
            return 0;
         
        case 'Tennessee':
            return (2.00 * amount)/100;
       
        case 'Texas':
            return 0;

        case 'Utah':
            return (4.95 * amount)/100;

        case 'Vermont':
        
            var limits = [39599, 95899, 200099, 200100].reverse()            
            var percents = [3.35, 6.60, 7.60, 8.75].reverse()
            return calculateTax(amount,limits,percents)

        
        case 'Virginia':

            var limits = [2999, 4999, 16999, 17000].reverse()            
            var percents = [2.00, 3.00, 5.00, 5.75].reverse()
            return calculateTax(amount,limits,percents)
        
        case 'Washington':
            return 0;
        
        case 'West Virginia':
            
            var limits = [ 9999, 24999, 39999, 59999, 60000].reverse()            
            var percents = [3.00, 4.00, 4.50, 6.00, 6.50].reverse()
            return calculateTax(amount,limits,percents)
        
        
        case 'Wisconsin':
        
            var limits = [11759, 23519, 258949, 258950].reverse()            
            var percents = [4.00, 5.84, 6.27, 7.65].reverse()
            return calculateTax(amount,limits,percents)
            
        case 'Wyoming':
            return 0;
        
        case 'District of Columbia':
        
            var limits = [9999, 39999, 59999, 349999, 999999,1000000].reverse()            
            var percents = [4.00,  6.00,  6.50,  8.50,  8.75,  8.95].reverse()
            return calculateTax(amount,limits,percents)

    }
}

function formatCurrency(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateTax(amount, limits, percents){
    
    let tax = 0;
    let limit = limits.pop();
    let prelimit = 0
    
    while(limit!=undefined && amount > 0)
    {
        
        if( amount > 0 && amount > limit && limits.length == 0  )
        {
            let percent = percents.pop()
            tax = tax + ((amount)*percent)/100 
            amount = amount - (limit-prelimit);
            prelimit = limit
        }
        else if(amount > 0 && amount > limit )
        {
            let percent = percents.pop()
            tax = tax + ((limit-prelimit)*percent)/100 
            amount = amount - (limit-prelimit);  
            prelimit = limit 

        }
        else if( amount > 0 && amount <= limit )
        {
            let percent = percents.pop()
            tax = tax + ((amount)*percent)/100 
            amount = amount - (limit-prelimit);
            prelimit = limit
        }
        limit = limits.pop()
    }
    return tax;
}

export default Home;
