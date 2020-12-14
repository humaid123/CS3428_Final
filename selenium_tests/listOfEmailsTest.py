# Humaid Agowun

from selenium.webdriver import Chrome
import time
import re

# IMPORTANT => for the test to work => we assume email0 is unread, email1 is unreadUrgent, email2 is read, email3 is readUrgent
# you need to set up the above manually to run the script...

# check if list loaded properly
# check if alert message for number of unread emails present
# check if yellow text present
# check if email0 present <==== need to send and receive an email before we run this test!!!

index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
student_email = "testForDisplayEmails"
student_password = "hi"


def testDisplayEmailIn(system):
    driver = Chrome("chromedriver.exe")
    driver.get(index_url)
    driver.find_element_by_id('studentSelection').click()
    time.sleep(1)
    driver.find_element_by_id("email").send_keys(student_email)
    driver.find_element_by_id("password").send_keys(student_password)
    driver.find_element_by_id(system).click()
    driver.find_element_by_id("signInButton").click()
    time.sleep(4)
    alert = driver.switch_to.alert
    alert.accept()
    time.sleep(4)
    alert = driver.switch_to.alert
    assert re.match(r"You have \d unread emails?.",
                    alert.text), "wrong numUnread alert message"
    alert.accept()
    assert re.match(r"NUMBER OF UNREAD EMAILS: \d", driver.find_element_by_class_name(
        "numUnread").get_attribute("innerHTML")), "wrong numUnread message"
    email = driver.find_element_by_id("email0")
    assert email != None, "email0 not present"
    # check emails class names
    # we assume email0 is unread, email1 is unreadUrgent, email2 is read, email3 is readUrgent
    # unread email0
    assert driver.find_element_by_id("email0").get_attribute(
        "class") == "emailRow unreadRow", "wrong email className unread email"
    assert driver.find_element_by_id("emailTwoButtons0").get_attribute(
        "class") == "twoButtons unreadTwoButtons", "wrong className unread two buttons"
    # unreadUrgent email1
    assert driver.find_element_by_id("email1").get_attribute(
        "class") == "emailRow unreadUrgentRow", "wrong email className unreadUrgent email"
    assert driver.find_element_by_id("emailTwoButtons1").get_attribute(
        "class") == "twoButtons unreadUrgentTwoButtons", "wrong className unreadUrgent two buttons"
    # read email2
    assert driver.find_element_by_id("email2").get_attribute(
        "class") == "emailRow readRow", "wrong email className read email"
    assert driver.find_element_by_id("emailTwoButtons2").get_attribute(
        "class") == "twoButtons readTwoButtons", "wrong className read two buttons"
    # readUrgent email3
    assert driver.find_element_by_id("email3").get_attribute(
        "class") == "emailRow readUrgentRow", "wrong email className readUrgent email"
    assert driver.find_element_by_id("emailTwoButtons3").get_attribute(
        "class") == "twoButtons readUrgentTwoButtons", "wrong className readUrgent two buttons"
    driver.close()


testDisplayEmailIn("Basic")
testDisplayEmailIn("Intermediate")
testDisplayEmailIn("Advanced")
