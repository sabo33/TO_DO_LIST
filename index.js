var tasks = [];

    // 페이지가 로드될 때 실행되는 함수
    window.onload = function() {
      // 로컬 저장소에서 할 일 데이터 가져오기
      var storedTasks = localStorage.getItem("tasks");

      if (storedTasks) {
        // 저장된 할 일 데이터가 있을 경우 배열로 변환하여 tasks에 할당
        tasks = JSON.parse(storedTasks);

        // 할 일 목록 렌더링
        showTaskList();
      }
    }

    function addTask() {
      var taskInput = document.getElementById("taskInput");
      var taskList = document.getElementById("taskList");

      var taskText = taskInput.value;

      if (taskText.trim() !== "") {
        tasks.push({ text: taskText, completed: false });

        // 로컬 저장소에 할 일 데이터 저장
        localStorage.setItem("tasks", JSON.stringify(tasks));

        showTaskList();

        taskInput.value = "";
      }
      else
        alert("할 일을 입력하세요!");
    }

    function showTaskList() {
      var taskList = document.getElementById("taskList");
      taskList.innerHTML = ""; // 이전 목록 삭제

      // 할 일 목록 
      for (var i = 0; i < tasks.length; i++) {
        var taskItem = document.createElement("li");
        var taskText = tasks[i].text;
        var completed = tasks[i].completed;

        taskItem.innerHTML = '<span onclick="completeTask(this, ' + i + ')"' + (completed ? ' class="completed"' : '') + '>' + taskText + '</span>  <button onclick="editTask(' + i + ')">수정</button>  <button onclick="deleteTask(this, ' + i + ')">삭제</button>';
        taskList.appendChild(taskItem);
      }
    }

    function completeTask(element, index) {
      element.classList.toggle("completed");

      // 할 일의 완료 상태 업데이트
      tasks[index].completed = !tasks[index].completed;

      // 로컬 저장소에 할 일 데이터 저장
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function editTask(index) {
      var newTaskText = prompt("새로운 할 일 내용을 입력하세요.");
      
      if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText;
        
        // 로컬 저장소에 할 일 데이터 저장
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        showTaskList();
      }
    }

    function deleteTask(element, index) {
      // 배열에서 해당 할 일 제거
      tasks.splice(index, 1);

      // 로컬 저장소에 할 일 데이터 저장
      localStorage.setItem("tasks", JSON.stringify(tasks));

      showTaskList();
    }