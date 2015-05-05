<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <!-- This is how you would link your custom stylesheet -->
    <link rel="stylesheet" href="{{ URL::asset('css/all.css') }}">
    <title>MICRO FINAL 2015</title>
</head>
<body>
    <section role="main" class="scroll-container">
        <div class="row fullWidth">
            <div class="small-12 medium-6 columns">
                <h1>FINAL</h1>
            </div>
            <div class="small-12 medium-6 columns">
                <div style="margin-top: 8px;;">
                    <strong>SOLAR : <span id="solar-value">-</span></strong>
                </div>
                <div class="progress secondary round">
                    <span id="solar-meter" class="meter" style="width: 0"></span>
                </div>
            </div>
        </div>
        <hr>
        <ul class="small-block-grid-3 medium-block-grid-5 large-block-grid-8">
            @foreach ($students as $student)
                <li class="device-status-box">
                    <span class="student-id">53070{{$student}}</span>
                    <div class="switch small">
                        <input id="deviceStatus-53070{{$student}}" type="checkbox" disabled>
                        <label for="deviceStatus-53070{{$student}}"></label>
                        <input id="deviceStatusWeb-53070{{$student}}" type="checkbox" disabled>
                        <label for="deviceStatusWeb-53070{{$student}}"></label>
                    </div>
                </li>
            @endforeach
        </ul>
    </section>
    <script src="{{ URL::asset('js/all.js') }}"></script>
</body>
</html>