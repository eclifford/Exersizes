#! /usr/bin/env python
"""Simple pynotifications for automated test runs.

TODO:
 * allow directories, test call to be args.
 * Find out if there are other expires options for pynotify
   so that it can disappear much more quickly.
 * Get rid of the gtk warnings when pynotify.init is called.
"""
import os
import subprocess
import sys

from xml.etree import ElementTree


try:
    import pynotify
except:
    print "You don't seem to have pynotify installed."
    sys.exit(1)

if not pynotify.init("Open Goal Tracker test runner"):
    print("There was a problem initializing the pynotify module")
    sys.exit(1)

try:
    import pyinotify
except:
    print "You don't seem to have pyinotify installed."
    exit(1)


watch_manager = pyinotify.WatchManager()


class ProcessEvents(pyinotify.ProcessEvent):
    """Only act on changes to files matching configured extensions."""

    icon_names = {
        "running": "test_running.svg",
        "failure": "test_failure.svg",
        "success": "test_success.svg",
        "error": "test_failure.svg",
        }

    def __init__(self, *args, **kwargs):
        super(ProcessEvents, self).__init__(*args, **kwargs)
        self.notification = pynotify.Notification(
            "Just initialise.")
        self.notification.set_urgency(pynotify.URGENCY_LOW)

    def get_icon_uri(self, test_state='running'):
        return "file://{current_dir}/{icon_file}".format(
            current_dir=os.path.dirname(os.path.abspath(__file__)),
            icon_file=self.icon_names.get(test_state, 'test_running.svg'))

    def process_IN_MODIFY(self, event):
        ignore, extension = os.path.splitext(event.name)
        extension = extension[1:]
        if extension in ['coffee', 'js', 'html']:
            print("Starting test run...")
            self.notification.update("Starting test run...", "",
                self.get_icon_uri(test_state="running"))
            self.notification.show()
            process = subprocess.Popen(
                'REPORTER=xunit make test-xunit --no-print-directory',
                shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            test_output, errors = process.communicate()
            if not test_output and errors:
                self.notification.update("Test run error", "",
                    self.get_icon_uri(test_state="error"))
                self.notification.show()
                print(errors)
            else:
                self.update_notification_from_output(test_output)

    def update_notification_from_output(self, test_output):
        try:
            test_suite = ElementTree.fromstring(test_output)
        except ElementTree.ParseError:
            print("XUnit test results could not be parsed.")
            exit(1)

        summary = "Successful test run"
        test_state = "success"
        stats = dict(test_suite.items())
        if stats['failures'] != '0':
            summary = "Test failures"
            test_state = "failure"

        details = (
            "Tests: {tests}\nFailures: {failures}\n"
            "Duration: {time}s".format(**stats))

        self.notification.update(summary, details,
                self.get_icon_uri(test_state))
        self.notification.show()

        if test_state == 'failure':
            failures = test_suite.findall('testcase/failure')
            for failure in failures:
                print("{classname}: {name}".format(
                    classname=failure.get('classname'),
                    name=failure.get('name')))
                print(failure.text)
        print('. '.join(details.split('\n')))


notifier = pyinotify.Notifier(watch_manager, ProcessEvents())

watch_manager.add_watch(os.getcwd() + '/app/scripts/',
    pyinotify.IN_MODIFY, rec=True)
watch_manager.add_watch(os.getcwd() + '/test/unit/',
    pyinotify.IN_MODIFY, rec=True)


while True:
    try:
        notifier.process_events()
        if notifier.check_events():
            notifier.read_events()
    except KeyboardInterrupt:
        notifier.stop()
        print("Stopped inotify watcher.")
        exit(0)
