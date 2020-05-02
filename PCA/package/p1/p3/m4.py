import logging
def f6():
    logger.info('entering p1.p3.m4.f6')
    logger.error('ERROR!: Damn ,man. I told you not to enter m4')
    logger.info('exiting p1.p3.m4.f6')
logger=logging.getLogger(__name__)
filehandler=logging.FileHandler(filename='p1.log')
filehandler.setLevel(logging.INFO)
streamhandler=logging.StreamHandler()
streamhandler.setLevel(logging.WARNING)
logger.addHandler(filehandler)
logger.addHandler(streamhandler)
logger.propagate=False
logger.setLevel(logging.INFO)