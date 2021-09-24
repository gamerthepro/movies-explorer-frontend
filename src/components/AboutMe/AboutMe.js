import './AboutMe.css'

const AboutMe = () => {
   return (
      <section className='aboutMe'>
         <h3 className='aboutMe__header'>Студент</h3>
         <div className='aboutMe__photo'/>
         <h2 className='aboutMe__title'>Артём</h2>
         <h4 className='aboutMe__subtitle'>Фронтенд-разработчик, 33 года</h4>
         <p className='aboutMe__text'>
         Я живу в г.Воскресенск, М.О. Закончил АПУ г.Рязань по специальности "Юриспруденция", квалификация "Юрист".
         Я люблю слушать музыку, а ещё занимаюсь спортом. Отработал 12 лет во ФСИН, перед уходом на пенсию задумался об освоении новой профессии.
         Меня интересуют технологии, вследствие чего я решил реализовать себя в программировании. Прошел курс от Яндекс Практикума по вэб-разработки, 
			нахожусь в активном поиске работы по данному направлению.
         </p>
         <div className='aboutMe__links'>
				<a href="https://github.com/gamerthepro" className='aboutMe__link'>Github</a>
				<a href="https://vk.com/id59669549" className='aboutMe__link'>ВКонтакте</a>
            <a href="https://www.facebook.com/tema.rembo" className='aboutMe__link'>Facebook</a>
         </div>
      </section>
   )
}

export default AboutMe;