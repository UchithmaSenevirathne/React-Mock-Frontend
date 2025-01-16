import  './calender.css'
import dashbg from '../assets/images/dash-background.jpg';

export  function  Dashboard () {
    return (
        <div className="bg-no-repeat w-full h-[700px] flex items-center justify-center rounded-lg gap-[300px]"
             style={{
                 backgroundImage: `url(${dashbg})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
             }}>
            {/* Statistics Section */}
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <div className="w-[200px] h-[200px] bg-[#002C2D] flex flex-col items-center justify-center gap-2 rounded-lg hover:scale-105 transform transition-all duration-300">
                        <h1 className="text-white text-lg font-medium">Total Crops</h1>
                        <p className="text-3xl text-white font-medium">10</p>
                    </div>
                    <div className="w-[200px] h-[200px] bg-[#002C2D] flex flex-col items-center justify-center gap-2 rounded-lg hover:scale-105 transform transition-all duration-300">
                        <h1 className="text-white text-lg font-medium">Total Fields</h1>
                        <p className="text-3xl text-white font-medium">5</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-[200px] h-[200px] bg-[#002C2D] flex flex-col items-center justify-center gap-2 rounded-lg hover:scale-105 transform transition-all duration-300">
                        <h1 className="text-white text-lg font-medium">Total Staffs</h1>
                        <p className="text-3xl text-white font-medium">10</p>
                    </div>
                    <div className="w-[200px] h-[200px] bg-[#002C2D] flex flex-col items-center justify-center gap-2 rounded-lg hover:scale-105 transform transition-all duration-300">
                        <h1 className="text-white text-lg font-medium">Total Vehicles</h1>
                        <p className="text-3xl text-white font-medium">12</p>
                    </div>
                </div>
            </div>

            {/* Calendar Section */}
            <div className="calendar-container">
                <header className="calendar-header">
                    <p className="calendar-current-date">January 2025</p>
                    <div className="calendar-navigation">
            <span id="calendar-prev" className="material-symbols-rounded">
              chevron_left
            </span>
                        <span id="calendar-next" className="material-symbols-rounded">
              chevron_right
            </span>
                    </div>
                </header>
                <div className="calendar-body">
                    <ul className="calendar-weekdays">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul className="calendar-dates">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li className="today">7</li>
                    </ul>
                    <ul className="calendar-dates">
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                    </ul>
                    <ul className="calendar-dates">
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                        <li>21</li>
                    </ul>
                    <ul className="calendar-dates">
                        <li>22</li>
                        <li>23</li>
                        <li>24</li>
                        <li>25</li>
                        <li>26</li>
                        <li>27</li>
                        <li>28</li>
                    </ul>
                    <ul className="calendar-dates">
                        <li>29</li>
                        <li>30</li>
                        <li>31</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}