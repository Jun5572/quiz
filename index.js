(function(){

	const quiz = document.getElementById('quiz');
	const result = document.getElementById('results');
	const submit_button = document.getElementById('submit');

	const prev_button = document.getElementById('prev');
	const next_button = document.getElementById('next');

	//問題を生成
	function buildQuiz(){
		const output = [];

		questions_items.forEach(function(current_question, question_number){
			const answers = [];
			for( letter in current_question.answers){
				answers.push(
								`<label>
								<input type="radio" name="question${question_number}" value=${letter}><span>${letter}: ${current_question.answers[letter]}</span>
								</label>`
							);
			}
			let question_container = `	<div class="slide">
											<div class="question">${current_question.question}</div>
								  	  		<div class="answers">${answers.join('')}</div>
								  	  	</div>`;
			output.push(question_container);
		});

		quiz.innerHTML = output.join('');

	};

	//結果
	function showResult(){
		const answer_containers = quiz.querySelectorAll('.answers');

		let num_correct = 0;
		let face_type;

		questions_items.forEach(function(current_question, question_number){
			const answer_container = answer_containers[question_number];
			const selector = 'input[name=question' + question_number + ']:checked';
			const user_answer = (answer_container.querySelector(selector) || {}).value;

			if(user_answer === current_question.correct_answer){
				num_correct++;
				// answer_containers[question_number].style.color = "lightgreen";
			} else {
				// answer_containers[question_number].style.color = "crimson";
			}
		});
		switch (num_correct){
			case 6:
			case 5:
				face_type = "\(*≧∀≦*)/";
				break;
			case 4:
			case 3:
				face_type = "٩( 'ω' )و";
				break;
			case 2:
			case 1:
				face_type = "ƪ(˘⌣˘)ʃﾔﾚﾔﾚﾀﾞｾﾞ";
				break;
			case 0:
				face_type= "( T_T)＼(^-^ )";
				break;
		};
		result.innerHTML = `<p class="result_score">${questions_items.length}問中${num_correct}問正解です！</p>
							<div class="score_face">${face_type}</div>
							<a href="index.html" class="restart" data-js="restart">初めからやり直す</a>`;
	}


	//スライド
	let current_slide = 0;

	function showSlide(n){
		const slides = document.querySelectorAll('.slide');

		slides[current_slide].classList.remove('active-slide');
		slides[n].classList.add('active-slide');
		current_slide = n;

		if(current_slide === 0){
			prev_button.style.visibility = 'hidden';
		} else {
			prev_button.setAttribute( "style", "display:inline-block, visibility:visible" );
		}

		if(current_slide === (slides.length - 1)){
			prev_button.style.visibility = 'hidden';
			next_button.style.visibility = 'hidden';
			submit_button.setAttribute( "style", "display:inline-block, visibility:visible" );
		} else {
			next_button.setAttribute( "style", "display:inline-block, visibility:visible" );
			submit_button.style.visibility = 'hidden';
		}
	};

	function showNextQuestion(){
		showSlide(current_slide + 1);
	};

	function showPrevQuestion(){
		showSlide(current_slide - 1);
	};

	function restartQuestion(){
		window.confirm('初めからやり直しますか？');
		location.reload();
	}

	buildQuiz();
	showSlide(0);


	submit_button.addEventListener( "click", showResult );
	prev_button.addEventListener( "click", showPrevQuestion );
	next_button.addEventListener( "click", showNextQuestion );
	// restart_button.addEventListener( "click", restartQuestion );

})();