import logging
def f1():
    logger.info('entering p1.f1')
    logger.info('exiting p1.f1')
def f2():
    logger.info('entering p1.f2')
    logger.warning("WARNING!: You entered m1, so don't enter m4")
    logger.info('exiting p1.f2')

logger=logging.getLogger(__name__)
filehandler=logging.FileHandler(filename='p1.log')
filehandler.setLevel(logging.INFO)
streamhandler=logging.StreamHandler()
streamhandler.setLevel(logging.WARNING)
logger.addHandler(streamhandler)
logger.addHandler(filehandler)
logger.setLevel(logging.INFO)